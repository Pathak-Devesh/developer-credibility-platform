import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getProfile } from "../../api/profileApi";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await loginUser({
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem("token", token);

      setToken(token);

      const profileResponse = await getProfile();

      setUser(profileResponse.data);


      if (profileResponse.data.role === "developer") {
        navigate("/dashboard");
      } else {
        navigate("/recruiter-coming-soon");
      }

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed"
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
            Welcome Back
          </p>

          <h1 className="text-5xl font-bold text-white leading-tight">
            Sign In To Your
            <br />
            Developer Profile
          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-xl">
            Access your verified projects, credibility score,
            GitHub-backed skills, and developer profile.
          </p>

          <div className="mt-10 space-y-4">

            <div className="flex items-center gap-3">
              <span className="text-red-400">✓</span>
              <p className="text-gray-300">
                Verified Projects
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-red-400">✓</span>
              <p className="text-gray-300">
                Verified Skills
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-red-400">✓</span>
              <p className="text-gray-300">
                Credibility Score
              </p>
            </div>

          </div>
        </div>



        <div
          className="bg-gray-900/30 backdrop-blur-md border border-gray-800 p-8 rounded-bl-3xl rounded-tr-3xl
                        rounded-br-md rounded-tl-md " >
          <h2 className="text-3xl font-bold text-white mb-6">
            Login
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3  rounded-lg bg-red-400 text-black font-semibold hover:bg-rose-500 transition-colors ">
              {loading ? "Logging in..." : "Login"}
            </button>


          </form>

          <p className="mt-6 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-red-400 font-semibold hover:!text-white"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}

export default LoginPage;