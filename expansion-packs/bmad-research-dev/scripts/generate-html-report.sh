#!/bin/bash
# generate-html-report.sh - Generate HTML report of all experiments
# Usage: ./generate-html-report.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Paths
RESULTS_DIR="results/experiments"
REPORTS_DIR="results/reports"
REPORT_FILE="${REPORTS_DIR}/experiment-report.html"

# Create reports directory
mkdir -p "${REPORTS_DIR}"

echo "Generating experiment report..."

# Count experiments
EXP_COUNT=$(find "${RESULTS_DIR}" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')

if [ "$EXP_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}No experiments found in ${RESULTS_DIR}${NC}"
    exit 0
fi

echo "Found $EXP_COUNT experiments"

# Start HTML report
cat > "${REPORT_FILE}" <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Experiment Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #f5f5f5;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 30px;
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .summary-card {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #4CAF50;
        }
        .summary-card h3 {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .summary-card .value {
            font-size: 32px;
            font-weight: bold;
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            text-align: left;
            padding: 12px;
            border-bottom: 1px solid #ddd;
        }
        th {
            background: #f9f9f9;
            font-weight: 600;
            color: #333;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        tr:hover {
            background: #f9f9f9;
        }
        .status {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
        }
        .status.completed {
            background: #e8f5e9;
            color: #2e7d32;
        }
        .status.running {
            background: #fff3e0;
            color: #e65100;
        }
        .status.failed {
            background: #ffebee;
            color: #c62828;
        }
        .metric {
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }
        .timestamp {
            color: #666;
            font-size: 13px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔬 Experiment Dashboard</h1>
        <p class="subtitle">Generated on GEN_DATE</p>

        <div class="summary">
            <div class="summary-card">
                <h3>Total Experiments</h3>
                <div class="value">TOTAL_EXPERIMENTS</div>
            </div>
            <div class="summary-card" style="border-left-color: #2196F3;">
                <h3>Completed</h3>
                <div class="value">COMPLETED_COUNT</div>
            </div>
            <div class="summary-card" style="border-left-color: #FF9800;">
                <h3>Running</h3>
                <div class="value">RUNNING_COUNT</div>
            </div>
            <div class="summary-card" style="border-left-color: #f44336;">
                <h3>Failed</h3>
                <div class="value">FAILED_COUNT</div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Experiment ID</th>
                    <th>Status</th>
                    <th>Key Metrics</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
EXPERIMENT_ROWS
            </tbody>
        </table>

        <div class="footer">
            Generated by BMAD Research-Dev Pack • results/reports/experiment-report.html
        </div>
    </div>
</body>
</html>
EOF

# Generate experiment rows
EXPERIMENT_ROWS=""
COMPLETED_COUNT=0
RUNNING_COUNT=0
FAILED_COUNT=0

for exp_dir in "${RESULTS_DIR}"/*; do
    if [ ! -d "$exp_dir" ]; then
        continue
    fi

    EXP_ID=$(basename "$exp_dir")
    METRICS_FILE="${exp_dir}/metrics.json"

    if [ -f "$METRICS_FILE" ]; then
        # Parse metrics file
        STATUS=$(jq -r '.status // "unknown"' "$METRICS_FILE")
        TIMESTAMP=$(jq -r '.timestamp // "N/A"' "$METRICS_FILE")

        # Extract key metrics (first 3)
        METRICS=$(jq -r '.metrics | to_entries | map("\(.key): \(.value)") | join(", ")' "$METRICS_FILE")

        # Truncate metrics if too long
        if [ ${#METRICS} -gt 60 ]; then
            METRICS="${METRICS:0:60}..."
        fi

        # Count statuses
        case "$STATUS" in
            completed) ((COMPLETED_COUNT++)) ;;
            running) ((RUNNING_COUNT++)) ;;
            failed) ((FAILED_COUNT++)) ;;
        esac

        # Create row
        EXPERIMENT_ROWS+="<tr>
    <td><strong>$EXP_ID</strong></td>
    <td><span class=\"status $STATUS\">$STATUS</span></td>
    <td class=\"metric\">$METRICS</td>
    <td class=\"timestamp\">$TIMESTAMP</td>
</tr>
"
    else
        EXPERIMENT_ROWS+="<tr>
    <td><strong>$EXP_ID</strong></td>
    <td><span class=\"status\">no metrics</span></td>
    <td class=\"metric\">-</td>
    <td class=\"timestamp\">-</td>
</tr>
"
    fi
done

# Replace placeholders
GEN_DATE=$(date +"%Y-%m-%d %H:%M:%S")
sed -i.bak "s|GEN_DATE|$GEN_DATE|g" "$REPORT_FILE"
sed -i.bak "s|TOTAL_EXPERIMENTS|$EXP_COUNT|g" "$REPORT_FILE"
sed -i.bak "s|COMPLETED_COUNT|$COMPLETED_COUNT|g" "$REPORT_FILE"
sed -i.bak "s|RUNNING_COUNT|$RUNNING_COUNT|g" "$REPORT_FILE"
sed -i.bak "s|FAILED_COUNT|$FAILED_COUNT|g" "$REPORT_FILE"
sed -i.bak "s|EXPERIMENT_ROWS|$EXPERIMENT_ROWS|g" "$REPORT_FILE"
rm "${REPORT_FILE}.bak"

echo -e "${GREEN}✓ Generated HTML report: ${REPORT_FILE}${NC}"
echo ""
echo "To view the report:"
echo "  open ${REPORT_FILE}"
echo ""
echo "Or on Linux:"
echo "  xdg-open ${REPORT_FILE}"
