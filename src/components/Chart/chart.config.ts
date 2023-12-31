import { IData } from "./chart.interfaces";

import styles from "./chart.module.scss";

const data: IData = {
    datasets: [
        {
            label: "Chart",
            data: [],
            backgroundColor: (ctx: any): string => {
                const {
                    raw: { o, c },
                } = ctx;

                return c >= o ? `${styles.greenColor}` : `${styles.redColor}`;
            },
        },
    ],
};

const options = {
    maintainAspectRatio: false,
    parsing: {
        xAxisKey: "x",
        yAxisKey: "s",
    },
    layout: {
        padding: {
            left: 10,
        },
    },
    scales: {
        x: {
            type: "timeseries" as const,
            time: {
                unit: "day" as const,
                tooltipFormat: "MMM d, yyyy",
            },
            grid: {
                color: `${styles.greyColor}`,
            },
        },
        y: {
            grace: 1,
            beginAtZero: false,
            position: "right" as const,
            grid: {
                color: `${styles.greyColor}`,
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                beforeBody: (ctx: any): string[] => {
                    const bodyArray = [
                        `O: ${ctx[0].raw.o.toFixed(2)}`,
                        `H: ${ctx[0].raw.h.toFixed(2)}`,
                        `L: ${ctx[0].raw.l.toFixed(2)}`,
                        `C: ${ctx[0].raw.c.toFixed(2)}`,
                    ];
                    return bodyArray;
                },
                label: (_: any): string => "",
            },
        },
    },
};

const candlestick = {
    id: "candlestick",
    beforeDatasetsDraw(chart: any): void {
        const {
            ctx,
            data,
            scales: { y },
        } = chart;

        ctx.save();
        ctx.lineWidth = 2;

        data.datasets[0].data.forEach((dataPoint: any, index: number): void => {
            const { o, c } = dataPoint;
            ctx.strokeStyle = c >= o ? `${styles.greenColor}` : `${styles.redColor}`;

            ctx.beginPath();
            ctx.moveTo(
                chart.getDatasetMeta(0).data[index].x,
                chart.getDatasetMeta(0).data[index].y
            );
            ctx.lineTo(
                chart.getDatasetMeta(0).data[index].x,
                y.getPixelForValue(data.datasets[0].data[index].h)
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(
                chart.getDatasetMeta(0).data[index].x,
                chart.getDatasetMeta(0).data[index].y
            );
            ctx.lineTo(
                chart.getDatasetMeta(0).data[index].x,
                y.getPixelForValue(data.datasets[0].data[index].l)
            );
            ctx.stroke();
        });
    },
};

const crosshair = {
    id: "crosshair",
    afterDatasetsDraw(chart: any): void {
        const {
            ctx,
            chartArea: { top, bottom, left, right, height },
            tooltip,
            scales: { x, y },
        } = chart;
        if (tooltip?._active && tooltip?._active.length) {
            const activePoint = tooltip._active[0];
            ctx.setLineDash([3, 3]);
            ctx.setLineWidth = 2;
            ctx.strokeStyle = `${styles.lightGreyColor}`;

            const lines = (startX: any, startY: any, endX: any, endY: any): void => {
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
                ctx.closePath();
            };

            lines(activePoint.element.x, top, activePoint.element.x, bottom);
            lines(
                left,
                y.getPixelForValue(tooltip.dataPoints[0].raw.c),
                right,
                y.getPixelForValue(tooltip.dataPoints[0].raw.c)
            );

            ctx.setLineDash([]);

            ctx.beginPath();
            ctx.fillRect(0, y.getPixelForValue(tooltip.dataPoints[0].raw.c) - 12, left, 24);

            ctx.beginPath();
            const textWidth = ctx.measureText(tooltip.dataPoints[0].label).width + 10;
            ctx.fillRect(
                x.getPixelForValue(tooltip.dataPoints[0].raw.x) - textWidth / 2,
                top + height,
                textWidth,
                24
            );

            ctx.fillStyle = "transparent";
            ctx.font = "bold 12px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseLine = "middle";

            ctx.fillText(
                tooltip.dataPoints[0].raw.c.toFixed(2),
                left / 2,
                y.getPixelForValue(tooltip.dataPoints[0].raw.c)
            );
            ctx.fillText(
                tooltip.dataPoints[0].label,
                x.getPixelForValue(tooltip.dataPoints[0].raw.x),
                top + height + 12
            );

            chart.canvas.style.cursor = "crosshair";
        } else {
            chart.canvas.style.cursor = "default";
        }
    },
};

const plugins = [candlestick, crosshair];

export const ChartConfig = {
    plugins,
    options,
    data,
};
