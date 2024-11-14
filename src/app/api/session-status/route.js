// pages/api/session-status.js
const STOCKVERSE_BACK_END = process.env.NEXT_PUBLIC_STOCKVERSE_BACK_END;

export default async function handler(req, res) {
    const { session_id } = req.query;
    const response = await fetch(`${STOCKVERSE_BACK_END}/session-status?session_id=${session_id}`);
    const data = await response.json();
    res.status(200).json(data);
}
