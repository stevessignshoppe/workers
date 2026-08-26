export default {
  async fetch(request, env, ctx) {
    // 1. Extract geographic data from the Cloudflare request object
    const city = request.cf?.city || "Unknown City";
    const region = request.cf?.regionCode || "Unknown Region";
    const country = request.cf?.country || "Unknown Country";

    // 2. Clone the original request so we can modify its headers
    const modifiedRequest = new Request(request);

    // 3. Inject the location data into custom headers for your server to read
    modifiedRequest.headers.set("X-Visitor-City", city);
    modifiedRequest.headers.set("X-Visitor-Region", region);
    modifiedRequest.headers.set("X-Visitor-Country", country);

    // OPTIONAL: Log the data to the Cloudflare console for real-time testing
    console.log(`Visitor from: ${city}, ${region}, ${country}`);

    // 4. Fetch the actual website content using the modified request
    return await fetch(modifiedRequest);
  },
};
