import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export function formatCustomDate(date: Date) {
  let result = formatDistanceToNow(new Date(date), {
    locale: es,
  });

  result = result.replace(/minutos?/, "m")
  .replace(/horas?/, "h")
  .replace(/días?/, "d")
  .replace(/meses?/, "mes")
  .replace(/años?/, "a");

   
  result = result.replace(/menos de un m/, "ahora");

  return result;
}
