import fs from 'fs';
import mkpath from 'mkpath';

export default function renameUploadedImages(id, files, table) {
    const SQL = files.map(file => {
        const filename = `${id}_${file.fieldname}.jpg`;
        const path = `${file.destination}/${table}`;

        mkpath(path, err => {
            if (err) {
                throw new Error(err);
            } else {
                fs.rename(file.path, `${path}/${filename}`);
            }
        });

        return {fieldname: file.fieldname, filename};
    })
    .map(({fieldname, filename}) => {
        return `${fieldname} = '${filename}'`;
    }).join(',');

    return `
        UPDATE ${table}
        SET ${SQL}
        WHERE id=${id}
    `;
};
