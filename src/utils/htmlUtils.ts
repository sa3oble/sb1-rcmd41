export function stripHtmlTags(html: string): string {
  // Create a temporary div element
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  // Get text content and normalize whitespace
  return temp.textContent?.replace(/\s+/g, ' ').trim() || '';
}

export function sanitizeHtml(html: string): string {
  // Create a temporary div element
  const temp = document.createElement('div');
  temp.innerHTML = html;

  // Remove unwanted elements
  const unwantedTags = temp.querySelectorAll('script, style, iframe');
  unwantedTags.forEach(element => element.remove());

  // Convert relative URLs to absolute
  const images = temp.querySelectorAll('img');
  images.forEach(img => {
    if (img.src) {
      img.src = img.src;
    }
  });

  return temp.innerHTML;
}