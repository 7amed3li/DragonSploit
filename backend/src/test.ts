import express from 'express';

const app = express();
const PORT = 3001; // سنستخدم منفذًا مختلفًا لتجنب أي تضارب

app.get('/', (req, res) => {
  res.send('Test sunucusu başarıyla çalışıyor!'); // <-- تم التعديل إلى التركية
});

app.listen(PORT, () => {
  // هذه هي المخرجات التي ستظهر في الطرفية عند التشغيل
  console.log(`🚀 Test sunucusu ${PORT} portunda stabil bir şekilde çalışıyor`); // <-- تم التعديل إلى التركية
  console.log('Eğer bu mesaj kalırsa, sorun Express veya Node\'da değildir.'); // <-- تم التعديل إلى التركية
  console.log('Sunucuyu manuel olarak durdurmak için Ctrl+C tuşlarına basın.'); // <-- تم التعديل إلى التركية
});
