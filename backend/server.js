import express from 'express';

const PORT = 8080;
const server = express();

server.use(express.json());

server.get("/bfhl/", (req, res) => {
   if (Object.keys(req.body).length > 0) {
      return res.status(400).json({ error: 'Request body not allowed' });
   }
   res.status(200).json({ "operation_code": 1 });
});

server.post('/bfhl/', (req, res) => {
   const data = req.body.data;

   if (!Array.isArray(data)) {
      return res.status(400).json({ "is_success": false, error: 'Invalid input syntax!' });
   }

   if (data.length === 0) {
      return res.status(400).json({ "is_success": false, error: 'Empty input!' });
   }

   let numbers = [];
   let alphabets = [];
   let highest = null;

   for (const ele of data) {
      if (ele.match(/^\d+$/)) {
         numbers.push(parseInt(ele));
      } else if (ele.length === 1) {
         alphabets.push(ele);
         if (!highest || ele > highest) {
            highest = ele;
         }
      } else {
         return res.status(400).json({ "is_success": false, error: `Invalid element: ${ele}` });
      }
   }

   if (highest === null) {
      highest = [];
   } else {
      highest = [highest];
   }

   const response = {
      "is_success": true,
      "user_id": 'John_Doe_01012001',
      "email": 'johndoe@example.com',
      "roll_number": 'RA2111003xxxx',
      "numbers": numbers,
      "alphabets": alphabets,
      "highest_alphabet": highest
   };

   res.json(response);
});

server.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});