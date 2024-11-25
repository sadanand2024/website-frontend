export async function POST(req) {
  console.log("anand");
  try {
    const { email, password } = await req.json();

    // You can simulate saving the user in a database here

    // Simulate a successful response
    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully!",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong during registration" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
