const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
const dirname="C://Users//hp//Desktop//Surpriselly-main"

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(dirname, 'public')));
app.use('/api/products', productRoutes);


// Connect to MongoDB
connectDB();


app.get('/', (req, res) => {
  res.sendFile(path.join(dirname, 'public', 'temp.html'));
});


// Start server
const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/temp.html`));

