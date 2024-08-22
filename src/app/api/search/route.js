// src/app/api/search/route.js for the app directory
import { NextResponse } from 'next/server';

export async function GET(request) {
const { searchParams } = new URL(request.url);
const keyword = searchParams.get('keyword');

const response = await fetch(`https://devsalman.tech/search?keyword=${keyword}`);
const data = await response.json();

return NextResponse.json(data);
}
