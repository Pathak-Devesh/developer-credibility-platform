import { loginUser } from "../../api/authApi";

function LoginPage() {
  const handleTestLogin = async () => {
    try {
      const response = await loginUser({
        email: "devesh@gmail.com",
        password: "12345678",
      });

      console.log("Full Response:", response);
      console.log("Response Data:", response.data);
      console.log("Token:", response.data.token);
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={handleTestLogin}>
        Test Login API
      </button>
    </div>
  );
}

export default LoginPage;