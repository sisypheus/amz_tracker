import cheerio from 'cheerio';
import axios from 'axios';

export const getImageUrl = async (req, res) => {
    try {
        const { data } = await axios.get(encodeURI(req.query.encode), {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11)'
            }
        }); 
        const $ = cheerio.load(data);
        const result = $('#landingImage').attr('src');
        res.status(200).json({ message: result });
    } catch (e) {
        res.status(409).json({ message: e.message });
        console.log(e.message);
    }
}