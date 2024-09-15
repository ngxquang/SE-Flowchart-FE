const pseudocodeRules = {
  BEGIN: /^BEGIN$/,
  END: /^END$/,
  INPUT: /^INPUT\s+\w+(,\s*\w+)*\s*$/,
  OUTPUT: /^OUTPUT\s+[\w\s,]+$/,
  IF: /^IF\s+.+\s+DO$/,
  ELSE: /^ELSE$/,
  ENDIF: /^ENDIF$/,
  WHILE: /^WHILE\s+.+\s+DO$/,
  ENDWHILE: /^ENDWHILE$/,
  ASSIGNMENT: /^\w+\s*=\s*.+$/ // Biểu thức gán
};

export const checkPseudocodeSyntax = (code: string) => {
  const lines = code
    .trim()
    .split('\n')
    .map((line) => line.trim());
  console.log('🚀 ~ checkPseudocodeSyntax ~ lines:', lines);
  const stack = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    console.log(i, pseudocodeRules.END.test(line));
    if (pseudocodeRules.BEGIN.test(line)) {
      stack.push('BEGIN');
    } else if (pseudocodeRules.END.test(line)) {
      if (stack.pop() !== 'BEGIN') {
        return `Lỗi: 'END' mà không có 'BEGIN' tại dòng ${i + 1}`;
      }
    } else if (pseudocodeRules.IF.test(line)) {
      stack.push('IF');
    } else if (pseudocodeRules.ENDIF.test(line)) {
      if (stack.pop() !== 'IF') {
        return `Lỗi: 'ENDIF' mà không có 'IF' tại dòng ${i + 1}`;
      }
    } else if (pseudocodeRules.WHILE.test(line)) {
      stack.push('WHILE');
    } else if (pseudocodeRules.ENDWHILE.test(line)) {
      if (stack.pop() !== 'WHILE') {
        return `Lỗi: 'ENDWHILE' mà không có 'WHILE' tại dòng ${i + 1}`;
      }
    } else if (
      pseudocodeRules.INPUT.test(line) ||
      pseudocodeRules.OUTPUT.test(line)
    ) {
      // Dòng INPUT và OUTPUT hợp lệ, không cần làm gì
    } else if (pseudocodeRules.ASSIGNMENT.test(line)) {
      // Dòng gán hợp lệ
    } else {
      return `Lỗi cú pháp tại dòng ${i + 1}: "${line}" không hợp lệ.`;
    }
  }

  if (stack.length > 0) {
    return `Lỗi: Thiếu 'END' cho các khối chưa đóng.`;
  }

  return 'Cú pháp hợp lệ.';
};
