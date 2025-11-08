import { RegisterForm } from '../../../components/auth/RegisterForm';

export default function RegisterPage(): JSX.Element {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold text-gray-900">
        Create your account
      </h1>
      <p className="mb-8 text-gray-600">
        Enter your email and create a password to start tracking your workouts.
      </p>
      <RegisterForm />
      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{' '}
        <a className="text-indigo-600 hover:text-indigo-500" href="/login">
          Log in here
        </a>
        .
      </p>
    </div>
  );
}
