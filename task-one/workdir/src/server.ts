import app from './app';

const port = process.env.PORT || 3011;

app.listen(port, () => {
  console.log(`🤝 Server fired 🔥 up on ports ${port}`);
});
