export default function createProxy(ctx) {
  return new Proxy(ctx, handler)
}

function handler() {
  
}