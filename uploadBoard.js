import { writeFileSync } from "node:fs"
import Parser from "rss-parser"

const TISTORY_URL = 'https://devjooj.tistory.com//rss'
const TODAY =  new Date().toDateString()
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});
 
const getUploadeList = async () => {
    const tistory = await parser.parseURL(TISTORY_URL);
    const boardList = tistory.items
    const uploadTodayBoardList = boardList.filter(board => new Date(board.pubDate).toDateString() === TODAY)
    return uploadTodayBoardList
}

const updateRepository = async () => {
    const uploadBoardList = await getUploadeList()
    uploadBoardList.map((board) => {
        writeFileSync(`${board.title}_${board.pubDate}`, board.content, 'utf8', (e) => {
            console.log(e)
        })
    })
}

updateRepository().then(() => console.log("업로드 완료"))