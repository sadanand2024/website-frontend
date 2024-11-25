import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  // Check if the user is authenticated based on localStorage
  const isAuthenticated =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the auth token
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link href="/home">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
