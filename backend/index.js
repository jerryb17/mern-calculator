const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb://127.0.0.1:27017/calculator', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const calculationSchema = new mongoose.Schema({
  expression: String,
  result: Number,
});

const Calculation = mongoose.model('Calculation', calculationSchema);

app.post('/api/calculate', async (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);
  let result;

  switch (req.body.operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
  }

  let calculation = new Calculation({
    expression: `${req.body.num1} ${req.body.operator} ${req.body.num2}`,
    result: result,
  });
  calculation = await calculation.save();

  res.send(calculation);
});

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
