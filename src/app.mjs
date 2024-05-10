import express from 'express';
import cors from 'cors';
import { NotionAPI } from 'notion-client';

const app = express();
const notion = new NotionAPI({
  activeUser:process.env.NOTION_ACTIVE_USER,
  authToken:process.env.NOTION_TOKEN_V2,
});

// Enable CORS for all routes
app.use(cors());


app.get('/',(req,res)=>{
  res.status(200).send("Home")
});

app.get('/page/:pageId', async (req, res) => {
  try {
    const { pageId } = req.params;
    const recordMap = await notion.getPage(pageId);
    res.json(recordMap);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    res.status(500).json({ error: 'Internal Server error' });
  }
});

// Define a route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Define a route for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

