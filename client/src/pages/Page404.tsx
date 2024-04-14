import { Link as RouterLink } from "react-router-dom";

export default function Page404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg text-center">
        <h3 className="text-3xl mb-4">Sorry, page not found!</h3>

        <p className="text-gray-600 mb-8">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </p>

        <div className="mx-auto mb-10">
          <img
            src="/assets/illustrations/illustration_404.svg"
            alt="404 Illustration"
            className="h-64"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md">
          <RouterLink to="/" className="text-white">
            Go to Home
          </RouterLink>
        </button>
      </div>
    </div>
  );
}
