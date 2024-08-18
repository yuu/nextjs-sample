const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);

export const generateCSV = (data: string[][], fileName: string) => {
  if (data.length === 0) {
    console.error("Data array is empty.");

    return;
  }

  try {
    // Create a Blob containing the CSV data
    const blob = new Blob([BOM, data.join("\n")], {
      type: "text/csv;charset=utf-8",
    });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating CSV:", error);
  }
};
