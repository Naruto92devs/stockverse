import dotenv from 'dotenv';

dotenv.config();

const API = process.env.STOCKVERSE_API;

async function getServerSideProps() {
  const res = await fetch(`${API}/symb-search?symbol=MSFT`);
  const data = await res.json();
  console.log(data)
}
getServerSideProps();