import cheerio from 'cheerio';
import axios from 'axios';

export const getPrice = async (req, res) => {
    try {
        const { data } = await axios.get(decodeURI(req.query.link), {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }); 
        const $ = cheerio.load(data);
        const raw_result = $('#priceblock_ourprice').text().replace(/\s/g, '').replace(/,/g, '.');
        const result = parseFloat(raw_result);
        res.status(200).json({ message: result });
    } catch (e) {
        res.status(409).json({ message: e });
        console.log(e.message);
    }
}