(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/history/test@example.com');
    const text = await res.text();
    console.log('STATUS', res.status);
    console.log(text);
  } catch (e) {
    console.error('ERROR', e.message);
  }
})();
