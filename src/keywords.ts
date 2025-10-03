import { retext } from 'retext'
import retextKeywords from 'retext-keywords'
import retextPos from 'retext-pos'

export async function keywordExtraction(s:string) {
    const file = await retext()
        .use(retextPos) // Make sure to use `retext-pos` before `retext-keywords`.
        .use(retextKeywords)
        .process(s)
    //TODO ADD NULL CHECK EHRE 
    return file;
}