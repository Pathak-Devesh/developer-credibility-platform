import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../api/authApi";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("developer");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await registerUser({
        name,
        email,
        password,
         role,
      });

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-center">


        <div>
          <p className="inline-block bg-red-400/20 text-red-300 px-3 py-1 rounded-full mb-6">
            Join The Platform
          </p>

          <h1 className="text-5xl font-bold text-white leading-tight">
            Build Your
            <br />
            Verified Developer Profile
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-xl">
            Showcase your projects, verify your skills,
            connect GitHub evidence, and build a credibility
            score backed by real development work.
          </p>

          <div className="mt-10 space-y-4">

            <div className="flex items-center gap-3">
              <span className="text-red-400">✓</span>
              <p className="text-gray-300">
                GitHub-backed verification
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-red-400">✓</span>
              <p className="text-gray-300">
                Verified skills
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-red-400">✓</span>
              <p className="text-gray-300">
                Credibility score
              </p>
            </div>

          </div>
        </div>


        <div
          className="
            bg-gray-900/30
            backdrop-blur-md
            border
            border-gray-800
            p-8
            rounded-bl-3xl
            rounded-tr-3xl
            rounded-br-md
            rounded-tl-md
          "
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Create Account
          </h2>

          <form
            className="space-y-5"
            onSubmit={handleSubmit}
          >

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="John Doe"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  bg-black/20
                  border
                  border-white/10
                  text-white
                  outline-none
                "
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="john@example.com"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  bg-black/20
                  border
                  border-white/10
                  text-white
                  outline-none
                "
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters long
              </p>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  bg-black/20
                  border
                  border-white/10
                  text-white
                  outline-none
                "
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="••••••••"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-lg
                  bg-black/20
                  border
                  border-white/10
                  text-white
                  outline-none
                "
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Account Type
              </label>

              <div className="flex gap-6">

                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="developer"
                    checked={role === "developer"}
                    className="accent-red-400"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Developer
                </label>

                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={role === "recruiter"}
                    className="accent-red-400"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Recruiter
                </label>

              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-3
                rounded-lg
                bg-red-400
                text-black
                font-semibold
                hover:bg-rose-500
                transition-colors
                disabled:opacity-50
              "
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-400 font-semibold hover:!text-white"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}

export default RegisterPage;