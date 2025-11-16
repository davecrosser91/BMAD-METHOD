#!/bin/bash
# log-experiment-metrics.sh - Log experiment metrics to JSON file
# Usage: ./log-experiment-metrics.sh <experiment-id> <metric-name> <metric-value> [<metric-name> <metric-value> ...]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check arguments
if [ $# -lt 3 ]; then
    echo -e "${RED}Error: Missing required arguments${NC}"
    echo "Usage: $0 <experiment-id> <metric-name> <metric-value> [<metric-name> <metric-value> ...]"
    echo ""
    echo "Example:"
    echo "  $0 exp-001 accuracy 0.95 loss 0.05 f1_score 0.93"
    exit 1
fi

EXPERIMENT_ID="$1"
shift

# Determine paths
RESULTS_DIR="results/experiments/${EXPERIMENT_ID}"
METRICS_FILE="${RESULTS_DIR}/metrics.json"

# Create directories if they don't exist
mkdir -p "${RESULTS_DIR}"

# Get current timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Check if metrics file exists
if [ -f "${METRICS_FILE}" ]; then
    echo -e "${YELLOW}Updating existing metrics file${NC}"
    # Read existing metrics
    EXISTING_METRICS=$(cat "${METRICS_FILE}")
else
    echo -e "${GREEN}Creating new metrics file${NC}"
    # Initialize new metrics file
    EXISTING_METRICS='{}'
fi

# Parse metric name-value pairs
METRICS_JSON="{}"
while [ $# -ge 2 ]; do
    METRIC_NAME="$1"
    METRIC_VALUE="$2"
    shift 2

    # Add to metrics JSON (simple approach - you might want jq for complex scenarios)
    # Check if value is a number
    if [[ "$METRIC_VALUE" =~ ^-?[0-9]+\.?[0-9]*$ ]]; then
        # Numeric value (no quotes)
        METRICS_JSON=$(echo "$METRICS_JSON" | jq --arg key "$METRIC_NAME" --argjson val "$METRIC_VALUE" '. + {($key): $val}')
    else
        # String value (with quotes)
        METRICS_JSON=$(echo "$METRICS_JSON" | jq --arg key "$METRIC_NAME" --arg val "$METRIC_VALUE" '. + {($key): $val}')
    fi
done

# Create complete metrics JSON
COMPLETE_JSON=$(jq -n \
    --arg exp_id "$EXPERIMENT_ID" \
    --arg timestamp "$TIMESTAMP" \
    --argjson metrics "$METRICS_JSON" \
    '{
        experiment_id: $exp_id,
        timestamp: $timestamp,
        metrics: $metrics,
        status: "completed"
    }')

# Write to file
echo "$COMPLETE_JSON" | jq '.' > "${METRICS_FILE}"

echo -e "${GREEN}✓ Logged metrics to: ${METRICS_FILE}${NC}"
echo ""
echo "Metrics logged:"
echo "$METRICS_JSON" | jq '.'
echo ""
echo "To view full metrics file:"
echo "  cat ${METRICS_FILE} | jq"
echo ""
echo "To generate HTML report:"
echo "  ./scripts/generate-html-report.sh"
