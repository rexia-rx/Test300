#!/usr/bin/env bash
set -euo pipefail

log() {
  local level="$1"
  local message="$2"
  printf '%s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ') ${level} ${message}" >&2
}

require_env() {
  local name="$1"
  if [[ -z "${!name:-}" ]]; then
    log "ERROR" "Environment variable ${name} is required"
    exit 1
  fi
}

require_env "PGHOST"
require_env "PGUSER"
require_env "PGDATABASE"
require_env "PGPASSWORD"
require_env "S3_BUCKET_NAME"
require_env "S3_REGION"

command -v pg_dump >/dev/null 2>&1 || {
  log "ERROR" "pg_dump command not found"
  exit 1
}

command -v aws >/dev/null 2>&1 || {
  log "ERROR" "aws CLI command not found"
  exit 1
}

PGPORT="${PGPORT:-5432}"
BACKUP_PREFIX="${BACKUP_PREFIX:-backups}"
TIMESTAMP="$(date -u +%Y%m%d_%H%M%S)"
FILENAME="myfitness2-db-backup-${TIMESTAMP}.sql"
ARCHIVE_FILE="${FILENAME}.gz"
S3_URI="s3://${S3_BUCKET_NAME}/${BACKUP_PREFIX}/${ARCHIVE_FILE}"

cleanup() {
  if [[ -f "${ARCHIVE_FILE}" ]]; then
    rm -f "${ARCHIVE_FILE}"
  fi
  if [[ -f "${FILENAME}" ]]; then
    rm -f "${FILENAME}"
  fi
}

trap cleanup EXIT

log "INFO" "db.backup.start user=${PGUSER} host=${PGHOST} database=${PGDATABASE}"

log "INFO" "Running pg_dump to create ${FILENAME}"
PGPASSWORD="${PGPASSWORD}" pg_dump \
  --host "${PGHOST}" \
  --port "${PGPORT}" \
  --username "${PGUSER}" \
  --dbname "${PGDATABASE}" \
  --format=custom \
  --file "${FILENAME}"

log "INFO" "Compressing backup file"
gzip --force "${FILENAME}"

AWS_ARGS=("s3" "cp" "${ARCHIVE_FILE}" "${S3_URI}" "--region" "${S3_REGION}")

if [[ -n "${S3_KMS_KEY_ID:-}" ]]; then
  AWS_ARGS+=("--sse" "aws:kms" "--sse-kms-key-id" "${S3_KMS_KEY_ID}")
else
  AWS_ARGS+=("--sse" "AES256")
fi

if [[ -n "${AWS_ENDPOINT_URL:-}" ]]; then
  AWS_ARGS+=("--endpoint-url" "${AWS_ENDPOINT_URL}")
fi

log "INFO" "Uploading ${ARCHIVE_FILE} to ${S3_URI}"
aws "${AWS_ARGS[@]}"

log "INFO" "db.backup.success uri=${S3_URI}"
