export async function POST(req) {
  try {
    const { email_or_phonenumber, password } = await req.json();

    // Simulate checking credentials (you would normally query a database here)
    // if (
    //   email_or_phonenumber === "tarateam@gmail.com" &&
    //   password === "tarateam"
    // ) {
      // Respond with success if the credentials are correct
      return new Response(
        JSON.stringify({
          success: true,
          message: "Login successful!",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    // }

    // If credentials are invalid, respond with an error
    return new Response(
      JSON.stringify({ error: "Invalid email or password" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong during login" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
