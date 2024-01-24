report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Article_Tab_0_document_0_tablet.png",
        "test": "../bitmaps_test/20240124-103312/backstop_default_Article_Tab_0_document_0_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_Article_Tab_0_document_0_tablet.png",
        "label": "Article Tab",
        "misMatchThreshold": 0.1,
        "url": "http://localhost:8080/reviewed-preprints/85111",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Figures_Tab_0_document_0_tablet.png",
        "test": "../bitmaps_test/20240124-103312/backstop_default_Figures_Tab_0_document_0_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_Figures_Tab_0_document_0_tablet.png",
        "label": "Figures Tab",
        "misMatchThreshold": 0.1,
        "url": "http://localhost:8080/reviewed-preprints/85111/figures",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Reviews_Tab_0_document_0_tablet.png",
        "test": "../bitmaps_test/20240124-103312/backstop_default_Reviews_Tab_0_document_0_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_Reviews_Tab_0_document_0_tablet.png",
        "label": "Reviews Tab",
        "misMatchThreshold": 0.1,
        "url": "http://localhost:8080/reviewed-preprints/85111/reviews",
        "expect": 0,
        "viewportLabel": "tablet",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    }
  ],
  "id": "backstop_default"
});