report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Article_Page_0_document_0_phone.png",
        "test": "../bitmaps_test/20240123-151742/backstop_default_Article_Page_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_Article_Page_0_document_0_phone.png",
        "label": "Article Page",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:8080/reviewed-preprints/85111",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": 72
          },
          "rawMisMatchPercentage": 21.574639789678145,
          "misMatchPercentage": "21.57",
          "analysisTime": 607
        },
        "diffImage": "../bitmaps_test/20240123-151742/failed_diff_backstop_default_Article_Page_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Article_Page_0_document_1_tablet.png",
        "test": "../bitmaps_test/20240123-151742/backstop_default_Article_Page_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_Article_Page_0_document_1_tablet.png",
        "label": "Article Page",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://localhost:8080/reviewed-preprints/85111",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 14.887726639236643,
          "misMatchPercentage": "14.89",
          "analysisTime": 708
        },
        "diffImage": "../bitmaps_test/20240123-151742/failed_diff_backstop_default_Article_Page_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});