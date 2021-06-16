import cheerio from 'cheerio';
import axios from 'axios';

export const getTitle = async (req, res) => {
    try {
        const { data } = await axios.get(decodeURI(req.query.link), {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11)'
            }
        }); 
        const $ = cheerio.load(data);
        const result = $('#productTitle').text();
        res.status(200).json({ message: result });
    } catch (e) {
        res.status(409).json({ message: e.message });
        console.log(e.message);
    }
}