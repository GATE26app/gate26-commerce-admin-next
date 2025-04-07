export const sanitizeInput = (input: string) => {
  return input
    .replace(/<script[^>]*?>.*?<\/script>/gi, '') // <script> 태그 제거
    .replace(/<img[^>]*?>.*?<\/img>/gi, '') // <script> 태그 제거
    .replace(/on\w+="[^"]*"/gi, '') // onerror, onload 같은 이벤트 제거
    .replace(/javascript:/gi, '') // javascript: 제거
    .replace(/<body[^>]*?>.*?<\/body>/gi, '') // <script> 태그 제거
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};