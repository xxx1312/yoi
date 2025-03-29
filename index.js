// api/index.js

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  
  if (req.method === "POST") {
    // Parse the JSON body (Vercel parses JSON automatically if the Content-Type is application/json)
    const data = req.body;
    // Here you’d normally store data (for example, in a database)
    // For demonstration, we just log it
    console.log("Received POST data:", data);
    
    // Send a success response (note: since we’re in proper CORS mode, the front end can read this)
    res.status(200).json({ status: "success", received: data });
    return;
    
  } else if (req.method === "GET") {
    const action = req.query.action;
    if (action === "topsis") {
      // Simulate TOPSIS calculation and return sample results.
      const results = {
        evaluationCount: 10,
        topsisResults: [
          { alternative: "Hydro", relativeCloseness: 0.8 },
          { alternative: "Solar", relativeCloseness: 0.6 },
          { alternative: "Wind", relativeCloseness: 0.5 },
          { alternative: "Geothermal", relativeCloseness: 0.7 },
          { alternative: "Bioenergy", relativeCloseness: 0.4 }
        ]
      };
      res.status(200).json(results);
      return;
      
    } else if (action === "feedback") {
      // Simulate feedback calculation with sample data.
      const feedbackResults = {
        feedbackCount: 5,
        averageFeedback: [4.2, 3.8, 4.0, 4.5, 4.0]
      };
      res.status(200).json(feedbackResults);
      return;
      
    } else {
      res.status(400).json({ status: "error", message: "No valid action provided" });
      return;
    }
  } else {
    res.status(405).json({ status: "error", message: "Method Not Allowed" });
    return;
  }
};
