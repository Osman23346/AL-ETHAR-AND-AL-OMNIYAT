export function exportAccountingCsv(filename:string,headers:string[],rows:(string|number)[][]){
 const cell=(value:string|number)=>'"'+String(value??"").replace(/"/g,'""')+'"';
 const csv="\uFEFF"+[headers,...rows].map(row=>row.map(cell).join(",")).join("\r\n");
 const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
 const anchor=document.createElement("a");anchor.href=url;anchor.download=filename+".csv";anchor.click();URL.revokeObjectURL(url);
}
