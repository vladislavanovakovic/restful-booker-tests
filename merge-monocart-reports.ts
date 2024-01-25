import { merge } from 'monocart-reporter';

const reportDataList = [
  process.cwd() + '/monocart-report-1_4/index.json',
  process.cwd() + '/monocart-report-2_4/index.json',
  process.cwd() + '/monocart-report-3_4/index.json',
  process.cwd() + '/monocart-report-4_4/index.json'

];

merge(reportDataList, {
  name: 'Restful booker tests',
  outputFile: 'final-monocart-report/index.html',
  trend: 'previous-trend.json',
 /* attachmentPath: (currentPath) => {
    const searchStr = '../test-results/';
    const replaceStr = './data/';

    if (currentPath.startsWith(searchStr)) {
      return replaceStr + currentPath.slice(searchStr.length);
    }

    return currentPath;
  }*/
});