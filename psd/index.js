import { saveAs } from 'file-saver'
import * as agpsd from 'ag-psd'
import { writePsd } from 'ag-psd'
import json from './data.json'
console.log(agpsd)
const psd = json
const buffer = writePsd(psd)
const blob = new Blob([buffer], { type: 'application/octet-stream' })

// saveAs(blob, 'my-file.psd')
