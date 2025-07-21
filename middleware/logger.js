const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const userAgent = req.get('User-Agent') || 'Unknown';
    const ip = req.ip || req.connection.remoteAddress || 'Unknown';

    // Log the incoming request
    console.log(`\n🔵 [${timestamp}] INCOMING REQUEST`);
    console.log(`   Method: ${method}`);
    console.log(`   URL: ${url}`);
    console.log(`   IP: ${ip}`);
    console.log(`   User-Agent: ${userAgent}`);
    
    // Log request body if it exists (for POST, PUT requests)
    if (req.body && Object.keys(req.body).length > 0) {
        console.log(`   Body:`, JSON.stringify(req.body, null, 2));
    }
    
    // Log query parameters if they exist
    if (req.query && Object.keys(req.query).length > 0) {
        console.log(`   Query:`, JSON.stringify(req.query, null, 2));
    }

    // Capture the original res.json and res.send methods
    const originalJson = res.json;
    const originalSend = res.send;

    // Override res.json to log the response
    res.json = function(data) {
        console.log(`\n🟢 [${new Date().toISOString()}] RESPONSE`);
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Method: ${method} ${url}`);
        console.log(`   Response Data:`, JSON.stringify(data, null, 2));
        console.log(`   ─────────────────────────────────────────────────────\n`);
        
        return originalJson.call(this, data);
    };

    // Override res.send to log the response
    res.send = function(data) {
        console.log(`\n🟢 [${new Date().toISOString()}] RESPONSE`);
        console.log(`   Status: ${res.statusCode}`);
        console.log(`   Method: ${method} ${url}`);
        console.log(`   Response Data:`, typeof data === 'object' ? JSON.stringify(data, null, 2) : data);
        console.log(`   ─────────────────────────────────────────────────────\n`);
        
        return originalSend.call(this, data);
    };

    // Log any errors
    res.on('finish', () => {
        if (res.statusCode >= 400) {
            console.log(`\n🔴 [${new Date().toISOString()}] ERROR RESPONSE`);
            console.log(`   Status: ${res.statusCode}`);
            console.log(`   Method: ${method} ${url}`);
            console.log(`   ─────────────────────────────────────────────────────\n`);
        }
    });

    next();
};

module.exports = logger; 