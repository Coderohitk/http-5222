// Blocking code example
console.log("Blocking code example:");
console.log("Before the timeout");
// Simulating a delay using a loop (blocking operation)
const start = Date.now();
while (Date.now() - start < 2000); // Waits for 2 seconds
console.log("After the timeout");

// Non-blocking code example
console.log("Non-blocking code example:");
console.log("Before the timeout");
setTimeout(() => {
    console.log("Inside the timeout (after 2 seconds)");
}, 2000); // Non-blocking delay
console.log("After the timeout");
