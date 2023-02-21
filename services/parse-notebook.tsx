import TurndownService from 'turndown';

// Initialize Turndown service
const turndownService = new TurndownService();

/**
 * Returns all elements with class "cell".
 */
function getAllCells(): HTMLCollectionOf<Element> {
  return document.getElementsByClassName('cell');
}

// Define interface for cell data
export interface CellDataInterface {
    cell_index: number;
    cell_type: string;
    cell_content: CodeCellInterface | TextCellInterface;
}

export interface CodeCellInterface {
  cell_input: string;
  cell_output: string;
}

export interface TextCellInterface {
  cell_text: string;
}

/**
 * Extracts cell data from the given cell element.
 * @param i The index of the cell in the array.
 * @param cell The cell element to extract data from.
 * @returns An object containing cell index, type, and content.
 */
function extractDataFromCell(i: number, cell: Element): { cell_index: number, cell_type: string, cell_content: string } {
  // Create cellData object
  const cellData = {
    "cell_index": i,
    "cell_type": null, 
    "cell_content": null
  };

  // Find cell type
  let cellType= "code_cell";
  if (cell.classList.contains('text_cell')) {
    cellType = "text_cell";
  }

  // Get cell content
  let cellContent: CodeCellInterface | TextCellInterface = null;
  if (cellType == "code_cell") {
    const cell_input = (cell.querySelector("div.input > div.inner_cell > div.input_area") as HTMLElement).outerText;
    const cell_output = (cell.querySelector("div.output_wrapper") as HTMLElement).outerText; 
    cellContent = {
      "cell_input": cell_input,
      "cell_output": cell_output
    };
  } else {
    const cellHtml = cell.getElementsByClassName('text_cell_render')[0].outerHTML;
    cellContent = {
      "cell_text": turndownService.turndown(cellHtml)
    }
  }

  // Add to cellData
  cellData["cell_type"] = cellType;
  cellData["cell_content"] = cellContent;

  return cellData;
}

/**
 * Returns an array of objects containing data from all cells on the page with class "cell".
 * @returns An array of cell data objects.
 */
export function getAllCellsData(): CellDataInterface[] {

  // Get all cells
  const allCells = getAllCells();
  const allCellsData: CellDataInterface[] = [];

  // Extract data from each cell
  for (let i = 0; i < allCells.length; i++) {
    const cell = allCells[i];
    const cellData: CellDataInterface = extractDataFromCell(i, cell);
    allCellsData.push(cellData);
  }

  return allCellsData;
}
