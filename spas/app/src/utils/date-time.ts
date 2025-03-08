import { format, parseISO, parse as parseFn, parse } from 'date-fns';

export const offset = new Date().getTimezoneOffset();

export const parseDate = (date: string): Date | null | string => {
    return parseISO(date).toString();
};

export const parseHumanDate = (date: string, setHourDate?: boolean) => {
    if (date) {
        const parseDate = parseFn(date, 'dd/MM/yyyy', new Date());

        if (setHourDate) {
            parseDate.setUTCHours(23); // Ajusta a hora para 23
            parseDate.setUTCMinutes(59); // Ajusta os minutos para 59
            parseDate.setUTCSeconds(59); // Ajusta os segundos para 59
            parseDate.setUTCMilliseconds(0); // Ajusta os milissegundos para 0
        }

        return parseDate.toISOString();
    }
    return '';
};

export const parseHumanDateTime = (date: string) => {
    return date
        ? parseFn(date, 'dd/MM/yyyy HH:mm', new Date()).toISOString()
        : '';
};

export const formatDate = (date: string) => {
    const parsed = parseDate(date);
    return parsed ? format(parsed, 'dd/MM/yyyy') : null;
};

export const formatDateTime = (date: string | number) => {
    let parsedDate: Date;
    if (typeof date === 'number') parsedDate = new Date(date);
    else if (typeof date === 'string')
        parsedDate = parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date());
    else return null;

    if (isNaN(parsedDate.getTime())) return null;

    return format(parsedDate, 'dd/MM/yyyy HH:mm');
};

export const formatTimestamp = (date: string) => {
    const parsed = parseDate(date);
    return parsed ? format(parsed, 'dd/MM/yyyy HH:mm:ss') : null;
};