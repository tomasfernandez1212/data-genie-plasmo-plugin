export default function windowChanger() {

  console.log("cell: ", (window as any).Jupyter.notebook.get_cell(0))

}
