// src/app/api/search/route.js for the app directory
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const STOCKVERSE_API = process.env.STOCKVERSE_API;
const API_KEY = process.env.API_KEY;

export async function GET(request) {
const { searchParams } = new URL(request.url);
const keyword = searchParams.get('keyword');

const response = await fetch(`${STOCKVERSE_API}/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${API_KEY}`);
const data = await response.json();

// return NextResponse.json(data);
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'no-store',
  },
});
}
