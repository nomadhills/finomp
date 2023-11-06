

// Function that take an object and filename and download it as a json file

import type {IncomeStatement} from "$lib/finapi/IncomeStatement";
import type {BalanceSheet} from "$lib/finapi/BalanceSheet";
import type {CashFlowStatement} from "$lib/finapi/CashflowStatement";

export const DownloadObjectAsJsonFile = (exportObj: any, exportName: string) => {
    // Create a new Blob with the JSON data
    const blob = new Blob([JSON.stringify(exportObj, null, 2)], {
        type: 'application/json',
    });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute to the filename
    link.download = exportName;

    // Create a URL for the blob
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
}

function convertToCsv(incomeStatement: IncomeStatement): string {
    const entries = Object.entries(incomeStatement);
    const csvRows = [];

    // Headers
    csvRows.push(entries.map(entry => `"${entry[0]}"`).join(','));

    // Values
    csvRows.push(entries.map(entry => `"${entry[1]}"`).join(','));

    return csvRows.join('\n');
}

export function DownloadIncomeStatementCsv(ticker:string,incomeStatements: IncomeStatement[]) {
    // Start with an array to hold all CSV lines
    const csvRows = [];

    // Add the header row with column titles
    if (incomeStatements.length > 0) {
        csvRows.push(Object.keys(incomeStatements[0]).join(','));
    }

    // Add each income statement as a row
    incomeStatements.forEach(incomeStatement => {
        const values = Object.values(incomeStatement).map((value) =>
            typeof value === 'string' && value.includes(',') ? `"${value}"` : String(value)
        );
        csvRows.push(values.join(','));
    });

    // Combine all rows into a single string with new lines
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Set the download filename for the CSV
    link.setAttribute('href', url);
    link.setAttribute('download', `${ticker}-IncomeStatements.csv`);

    // Trigger the download
    document.body.appendChild(link); // Required for Firefox
    link.click();

    // Clean up the DOM
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Free up memory by releasing the object URL
}

export function DownloadBalanceSheetCsv(ticker:string, balanceSheets: BalanceSheet[]) {
    // Start with an array to hold all CSV lines
    const csvRows = [];

    // Add the header row with column titles
    if (balanceSheets.length > 0) {
        csvRows.push(Object.keys(balanceSheets[0]).join(','));
    }

    // Add each income statement as a row
    balanceSheets.forEach(balanceSheet => {
        const values = Object.values(balanceSheet).map((value) =>
            typeof value === 'string' && value.includes(',') ? `"${value}"` : String(value)
        );
        csvRows.push(values.join(','));
    });

    // Combine all rows into a single string with new lines
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // Set the download filename for the CSV
    link.setAttribute('href', url);
    link.setAttribute('download', `${ticker}-BalanceSheets.csv`);

    // Trigger the download
    document.body.appendChild(link); // Required for Firefox
    link.click();

    // Clean up the DOM
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Free up memory by releasing the object URL
}


