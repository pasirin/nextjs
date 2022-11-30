import XLSX from 'xlsx-js-style'
import { WorkSheet } from './SheetClass.js'
import { LoginAndExtract } from './FetchData.js'
import { errors } from 'playwright-core';

export default async function handler(req, res) {
  const method  = req.method
  const body = JSON.parse(req.body)
  switch (method) {
    case "POST":
      const {mssv, password, type}  = body
      if (mssv == undefined || password == undefined) {
        res.status(404).json({ text: 'Error missing Username and Password' })
      } else {
        try {
          const SubjectList = await LoginAndExtract(mssv, password)
          if(type == "dataOnly") {
            res.status(200).json(SubjectList)
            break
          }
          const ws = new WorkSheet('1', "SheetJSNode")
          ws.initSheet()
          ws.setSubjectList(SubjectList)
          ws.fillInSubject()
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, ws.Sheet, "Sheet")
          if(type == "table") {
            res.status(200).json(XLSX.utils.sheet_to_html(ws.Sheet))
            break
          }
          const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
          res.statusCode = 200;
          res.setHeader('Content-Disposition', 'attachment; filename="SheetJSNode.xlsx"');
          res.setHeader('Content-Type', 'application/vnd.ms-excel');
          res.end(buf);
        } catch (error) {
          if (error instanceof errors.TimeoutError) {
            res.status(408).json({ text: 'Server trường hiện đang không phản hồi, nếu bạn có thể vào trang http://dangkyhoc.vnu.edu.vn/ bình thường thì xin hãy thử lại sau vài giây' })
          } else if (error.name == "WrongUsernamePassword") {
            res.status(400).json({ text: 'Sai mã sinh viên hoặc mật khẩu' })
          } else {
            console.log(error)
            res.status(500).json({ text: 'API của VNUSchedule đang lỗi mong bạn hãy thông báo lại cho chủ page' , error: error})
          }
        }
      }
      break
    default:
      res.status(405).json({ text: 'unauthorised access' })
      break
  }
}