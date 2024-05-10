/* eslint-disable */
import { Content } from '../../types';

export const content: Content = [
  {
    type: 'Heading',
    id: 's1',
    depth: 1,
    content: [
      'Introduction'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Autpohagy is the lysosome-based degradation system in eukaryotes essential for cellular\n                homeostasis as part of intracellular quality control and intracellular remodeling during environmental\n                adaptation (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c2',
            content: [
              'Bento et\n                    al., 2016'
            ]
          },
          '; ',
          {
            type: 'Cite',
            target: 'c17',
            content: [
              '\n                    Kawabata and Yoshimori, 2020'
            ]
          },
          '; ',
          {
            type: 'Cite',
            target: 'c36',
            content: [
              'Noda and Inagaki, 2015'
            ]
          },
          ';\n                    ',
          {
            type: 'Cite',
            target: 'c48',
            content: [
              'Zhao et al., 2021'
            ]
          }
        ]
      },
      '\n                ). Dysregulated autophagy is associated with aging and diseases (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c5',
            content: [
              'Fleming et\n                    al., 2022'
            ]
          },
          '; ',
          {
            type: 'Cite',
            target: 'c17',
            content: [
              '\n                    Kawabata and Yoshimori, 2020'
            ]
          },
          '; ',
          {
            type: 'Cite',
            target: 'c21',
            content: [
              'Klionsky et al., 2021'
            ]
          },
          '; ',
          {
            type: 'Cite',
            target: 'c31',
            content: [
              'Mizushima and Levine,\n                    2020'
            ]
          },
          ';\n                    ',
          {
            type: 'Cite',
            target: 'c48',
            content: [
              'Zhao et al., 2021'
            ]
          }
        ]
      },
      '\n                ). Macroautophagy and microautophagy are major autophagy pathways by which cytoplasmic material is\n                delivered to lysosomes for degradation. The former pathway involves the formation of an autophagosome\n                that sequesters material and fuses with lysosomes while the latter pathway occurs via direct\n                invagination of the lysosomal membrane (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c17',
            content: [
              'Kawabata\n                    and Yoshimori, 2020'
            ]
          },
          '; ',
          {
            type: 'Cite',
            target: 'c36',
            content: [
              'Noda and Inagaki, 2015'
            ]
          },
          ';\n                    ',
          {
            type: 'Cite',
            target: 'c48',
            content: [
              'Zhao et al., 2021'
            ]
          }
        ]
      },
      '\n                ). “Autophagy” will refer to macroautophagy and microautophagy collectively hereafter. Autophagic\n                activity is the uninterrupted series of events that begins with material entering lysosomes and ends\n                with their degradation by lysosomal hydrolases. The amount of autophagic degradation is often referred\n                to as autophagic flux (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c21',
            content: [
              'Klionsky et al., 2021\n                    '
            ]
          }
        ]
      },
      '\n                ).\n            '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Monitoring autophagic flux is integral to studying autophagy (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c37',
            content: [
              'Ohsumi, 2014'
            ]
          }
        ]
      },
      '\n                ). Quantitative assays have been developed for ',
      {
        type: 'Emphasis',
        content: [
          'Saccharomyces cerevisiae'
        ]
      },
      ',\n                with the GFP-Atg8 processing assay being the most commonly used (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c43',
            content: [
              'Shintani and Klionsky,\n                        2004\n                    '
            ]
          }
        ]
      },
      '\n                ). GFP-Atg8 localizes to both outer and inner autophagosomal membranes and is delivered into the vacuole\n                as part of autophagic bodies (inner membrane-delimited vesicles), where GFP-Atg8 is then processed by\n                vacuolar proteases. Unlike Atg8, GFP is relatively stable against vacuolar proteolysis and accumulates\n                in the vacuole as autophagy progresses. The amount of free GFP detected by immunoblotting thus reflects\n                autophagic flux. Additionally, this assay can be adapted to monitor specific forms of autophagy by\n                replacing Atg8 in the reporter with one’s protein of interest, such as with the mitochondrial protein\n                Om45 to monitor mitophagy (selective autophagy of mitochondria) (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c14',
            content: [
              'Kanki and Klionsky,\n                        2008\n                    '
            ]
          }
        ]
      },
      '\n                ) or the cytosolic protein Pgk1 to monitor bulk nonselective autophagy (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c47',
            content: [
              'Welter et al., 2010\n                    '
            ]
          }
        ]
      },
      '\n                ). The versatility and ease of implementing the reporter processing assay are reasons why it is\n                routinely used in yeast autophagy studies.\n            '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Implementing the GFP-Atg8 processing assay in mammalian cells (using LC3 and GABARAP family\n                proteins) has been challenging because GFP is rapidly degraded in mammalian lysosomes (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c15',
            content: [
              'Katayama et al., 2008\n                    '
            ]
          }
        ]
      },
      '\n                ). Only a few studies have succeeded in detecting the release of free GFP (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c8',
            content: [
              'Gao et al.,\n                    2008'
            ]
          },
          ';\n                    ',
          {
            type: 'Cite',
            target: 'c9',
            content: [
              'Hosokawa et al., 2006'
            ]
          }
        ]
      },
      '\n                ). Although the success rate could be increased by raising the luminal pH of lysosomes with\n                non-saturating concentrations of lysosomotropic agents (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c8',
            content: [
              'Gao et al.,\n                    2008'
            ]
          },
          ';\n                    ',
          {
            type: 'Cite',
            target: 'c21',
            content: [
              'Klionsky et al., 2021\n                    '
            ]
          }
        ]
      },
      '\n                ), doing so might also affect GFP-LC3 processing itself and thus would require careful optimization. The\n                difficulties in properly executing the GFP-LC3 processing assay prompted researchers to develop other\n                assays.\n            '
    ]
  },
  {
    "type": "Paragraph",
    "content": [
      "Adaptation Profile\r\n"
    ]
  },
  {
    "type": "List",
    "items": [
      {
        "type": "ListItem",
        "content": [
          {
            "type": "Paragraph",
            "content": [
              {
                "type": "Strong",
                "content": [
                  {
                    "type": "NontextualAnnotation",
                    "content": [
                      "No Adaptation ="
                    ]
                  }
                ]
              },
              {
                "type": "Superscript",
                "content": [
                  {
                    "type": "Emphasis",
                    "content": [
                      "noA"
                    ]
                  }
                ]
              },
              ": Cluster 1, 9, 10"
            ]
          }
        ]
      },
      {
        "type": "ListItem",
        "content": [
          {
            "type": "Paragraph",
            "content": [
              {
                "type": "Strong",
                "content": [
                  "Weak Depression ="
                ]
              },
              {
                "type": "Superscript",
                "content": [
                  {
                    "type": "Emphasis",
                    "content": [
                      "weakD"
                    ]
                  }
                ]
              },
              ": Cluster 5, 6, 11"
            ]
          }
        ]
      },
      {
        "type": "ListItem",
        "content": [
          {
            "type": "Paragraph",
            "content": [
              {
                "type": "Strong",
                "content": [
                  "Medium Depression ="
                ]
              },
              {
                "type": "Superscript",
                "content": [
                  {
                    "type": "Emphasis",
                    "content": [
                      "medD"
                    ]
                  }
                ]
              },
              ": Cluster 2, 3, 7"
            ]
          }
        ]
      },
      {
        "type": "ListItem",
        "content": [
          {
            "type": "Paragraph",
            "content": [
              {
                "type": "Strong",
                "content": [
                  "Strong Depression ="
                ]
              },
              {
                "type": "Superscript",
                "content": [
                  {
                    "type": "Emphasis",
                    "content": [
                      "strgD"
                    ]
                  }
                ]
              },
              ": Cluster 4, 8"
            ]
          }
        ]
      },
      {
        "type": "ListItem",
        "content": [
          {
            "type": "Paragraph",
            "content": [
              {
                "type": "Strong",
                "content": [
                  "Potentiation ="
                ]
              },
              {
                "type": "Superscript",
                "content": [
                  {
                    "type": "Emphasis",
                    "content": [
                      "Pot"
                    ]
                  }
                ]
              },
              ": Cluster 12"
            ]
          }
        ]
      }
    ],
    "order": "Unordered"
  },
  {
    "type": "Paragraph",
    "content": [
      "Response Shape\r\n"
    ]
  },
  {
    "type": "List",
    "items": [
      {
        "type": "ListItem",
        "content": [
          {
            "type": "Paragraph",
            "content": [
              {
                "type": "Strong",
                "content": [
                  "On-response ="
                ]
              },
              {
                "type": "Subscript",
                "content": [
                  {
                    "type": "Emphasis",
                    "content": [
                      "On"
                    ]
                  }
                ]
              },
              ": Cluster 1, 2"
            ]
          }
        ]
      },
      {
        "type": "ListItem",
        "content": [
          {
            "type": "Paragraph",
            "content": [
              {
                "type": "Strong",
                "content": [
                  "Long/sustained response ="
                ]
              },
              {
                "type": "Subscript",
                "content": [
                  {
                    "type": "Emphasis",
                    "content": [
                      "L"
                    ]
                  }
                ]
              },
              ": Cluster 3, 4"
            ]
          }
        ]
      },
      {
        "type": "ListItem",
        "content": [
          {
            "type": "Paragraph",
            "content": [
              {
                "type": "Strong",
                "content": [
                  "Medium-length response ="
                ]
              },
              {
                "type": "Subscript",
                "content": [
                  {
                    "type": "Emphasis",
                    "content": [
                      "M"
                    ]
                  }
                ]
              },
              ": Cluster 5, 6, 9"
            ]
          }
        ]
      },
      {
        "type": "ListItem",
        "content": [
          {
            "type": "Paragraph",
            "content": [
              {
                "type": "Strong",
                "content": [
                  "Short/transient response ="
                ]
              },
              {
                "type": "Subscript",
                "content": [
                  {
                    "type": "Emphasis",
                    "content": [
                      "S"
                    ]
                  }
                ]
              },
              ": Cluster 7, 8,10,11"
            ]
          }
        ]
      }
    ],
    "order": "Unordered"
  },
  {
    type: 'Paragraph',
    content: [
      'In mammalian cells, autophagic flux is often estimated from the amount of selective\n                autophagic cargo degraded or, with the LC3 turnover assay, the amount of LC3-II produced in the presence\n                of a lysosomal inhibitor (i.e., the amount of LC3-II that would have otherwise been degraded) (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c21',
            content: [
              'Klionsky\n                    et al., 2021'
            ]
          },
          '; ',
          {
            type: 'Cite',
            target: 'c32',
            content: [
              '\n                    Mizushima and Murphy, 2020'
            ]
          },
          ';\n                    ',
          {
            type: 'Cite',
            target: 'c33',
            content: [
              'Mizushima and Yoshimori,\n                        2007\n                    '
            ]
          }
        ]
      },
      '\n                ). Autophagic flux can also be monitored with the fluorescent reporters, RFP-GFP-LC3 (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c19',
            content: [
              'Kimura et al., 2007\n                    '
            ]
          }
        ]
      },
      '\n                ) and GFP-LC3-RFP (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c13',
            content: [
              'Kaizuka et al., 2016\n                    '
            ]
          }
        ]
      },
      '\n                ), with which autophagic flux is determined from the reduction in GFP fluorescence compared to the\n                relatively unchanging fluorescence of the lysosome-resistant RFP and cytosol-localizing RFP,\n                respectively. However, each assay has its own limitations (for a full list, see\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c21',
            content: [
              'Klionsky\n                    et al., 2021'
            ]
          },
          ';\n                    ',
          {
            type: 'Cite',
            target: 'c32',
            content: [
              'Mizushima and Murphy,\n                        2020\n                    '
            ]
          }
        ]
      },
      '\n                ). Some require the use of a lysosomal inhibitor control, which can limit the assay’s dynamic range (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c26',
            content: [
              'Liebl et al., 2022'
            ]
          }
        ]
      },
      '\n                ) and cause side-effects (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c6',
            content: [
              'Florey et\n                    al., 2015'
            ]
          },
          ';\n                    ',
          {
            type: 'Cite',
            target: 'c11',
            content: [
              'Juhasz, 2012'
            ]
          }
        ]
      },
      '\n                ), while others are complicated or are low in sensitivity. Failing to consider and address the\n                limitations may lead to misinterpretations of autophagic flux.\n            '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Here, we report the HaloTag (Halo)-based processing assay, a simple and effective method to\n                quantitatively monitor autophagic flux in mammalian cells. We found that Halo becomes proteolytically\n                resistant upon ligand binding. Pulse-labeling with Halo ligand creates a pool of Halo-based reporters\n                that, when delivered into lysosomes by autophagy, are proteolytically processed to release stable free\n                Halo',
      {
        type: 'Superscript',
        content: [
          'ligand'
        ]
      },
      ' (Halo covalently conjugated with its ligand). The amount of free Halo',
      {
        type: 'Superscript',
        content: [
          'ligand\n                '
        ]
      },
      ' thus reflects autophagic flux specifically. Moreover, Halo-based reporters can also be used by\n                fluorescence microscopy and other means. We demonstrate the applications of this assay by monitoring\n                macroautophagy, selective autophagy, and bulk nonselective autophagy.\n            '
    ]
  },
  {
    type: 'Heading',
    id: 's2',
    depth: 1,
    content: [
      'Results'
    ]
  },
  {
    type: 'Heading',
    id: 's2a',
    depth: 2,
    content: [
      'A HaloTag-LC3B processing assay to quantify autophagic flux in mammalian cells\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Although a few studies have succeeded in doing so (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c8',
            content: [
              'Gao et\n                        al., 2008'
            ]
          },
          ';\n                        ',
          {
            type: 'Cite',
            target: 'c9',
            content: [
              'Hosokawa et al., 2006\n                        '
            ]
          }
        ]
      },
      '\n                    ), implementing the equivalent of the routinely used yeast GFP-Atg8 processing assay (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c21',
            content: [
              'Klionsky et al.,\n                            2021\n                        '
            ]
          }
        ]
      },
      '\n                    ) in mammalian cells is challenging. With monomeric GFP (mGFP)-LC3B, a small amount of free mGFP was\n                    produced in wild-type HeLa cells but not in ',
      {
        type: 'Emphasis',
        content: [
          'FIP200'
        ]
      },
      ' knockout (KO) cells\n                    under both growing and starvation conditions, indicating that free mGFP was generated in an\n                    autophagy-dependent manner (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'Figure 1a'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). However, although a starvation-induced decrease of mGFP-LC3B levels was detected, an increase in\n                    free mGFP levels was not (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'Figure 1a'
                ]
              }
            ]
          }
        ]
      },
      '\n                    , left) as mGFP is degraded in mammalian lysosomes like other GFPs (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c15',
            content: [
              'Katayama et al.,\n                            2008\n                        '
            ]
          }
        ]
      },
      '\n                    ). Replacing mGFP with the proteolytically resistant monomeric RFP (mRFP) (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c15',
            content: [
              'Katayama et al.,\n                            2008\n                        '
            ]
          }
        ]
      },
      '\n                    ) allowed for an increase in free mRFP levels upon starvation to be detected (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'Figure 1a'
                ]
              }
            ]
          }
        ]
      },
      '\n                    , right) but the increase was not apparent due to the pre-existing mRFP band (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'Figure 1a'
                ]
              }
            ]
          }
        ]
      },
      '\n                    , right) that probably resulted from basal autophagy-mediated lysosomal accumulation (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c15',
            content: [
              'Katayama et al.,\n                            2008\n                        '
            ]
          }
        ]
      },
      '\n                    ). Hence, it is difficult to detect mammalian autophagic flux with a GFP-or RFP-tagged LC3\n                    processing assay.\n                '
    ]
  },
  {
    type: 'Figure',
    id: 'fig1',
    caption: [
      {
        type: 'Heading',
        content:
          'Processed ligand-bound HaloTag from HaloTag-LC3 is a quantifiable readout\n                            reflecting autophagic flux.\n                        '
        ,
        depth: 4,
        id: 'fig1-heading',
      },
      {
        type: 'Paragraph',
        content: [
          '(',
          {
            type: 'Strong',
            content: [
              'a'
            ]
          },
          ') Immunoblotting of total cell lysates from wild-type and ',
          {
            type: 'Emphasis',
            content: [
              'FIP200\n                        '
            ]
          },
          ' knockout (KO) HeLa cells stably expressing mGFP-LC3B or mRFP-LC3B that were in\n                            nutrient-rich medium (0 h) or incubated for 6 h in starvation medium. (',
          {
            type: 'Strong',
            content: [
              'b'
            ]
          },
          ')\n                            Immunoblotting and in-gel fluorescence detection of total cell lysates from wild-type and ',
          {
            type: 'Emphasis',
            content: [
              'FIP200 KO\n                            '
            ]
          },
          ' HeLa cells stably expressing Halo-LC3B that was pulse-labeled for 20 min with 100\n                            nM of TMR-conjugated ligand in nutrient-rich medium. The cells were immediately collected (0\n                            h) or incubated in starvation medium for 6 h. (',
          {
            type: 'Strong',
            content: [
              'c'
            ]
          },
          ') Same cells and labeling\n                            procedure as in (b) except that the cells were collected or incubation in starvation medium\n                            with or without 100 nM bafilomycin A1 (BafA) for 2 h. (',
          {
            type: 'Strong',
            content: [
              'd'
            ]
          },
          ') Same labeling\n                            procedure as in (b) except with HeLa cells stably expressing SNAP-tag (SNAP)-LC3B and\n                            TMR-conjugated ligand targeting SNAP. (',
          {
            type: 'Strong',
            content: [
              'e'
            ]
          },
          ') Illustration of the fate of\n                            ligand-free and ligand-bound Halo-LC3B in autolysosomes. Halo-LC3B is processed by lysosomal\n                            hydrolases, releasing Halo from LC3B. When free from ligand, Halo is unstable and quickly\n                            degraded in lysosomes like LC3B. In contrast, ligand-bound Halo is stable against\n                            degradation and accumulates in lysosomes. Released Halo',
          {
            type: 'Superscript',
            content: [
              'ligand'
            ]
          },
          ' is detectable by\n                            immunoblot and, if a fluorescent ligand was used, in-gel fluorescence detection. The amount\n                            of free Halo',
          {
            type: 'Superscript',
            content: [
              'ligand'
            ]
          },
          ' separated from LC3B reflects the level of autophagic flux.\n                            (',
          {
            type: 'Strong',
            content: [
              'f'
            ]
          },
          ') Immunoblotting and in-gel fluorescence detection of total cell lysates from\n                            wild-type HeLa cells stably expressing Halo-LC3B, pulse-labeled with 100 nM TMR-conjugated\n                            ligand in nutrient-rich medium for 20 min, and starved for the indicated durations. (',
          {
            type: 'Strong',
            content: [
              '\n                                g'
            ]
          },
          ') Quantification of results shown in (f). Halo',
          {
            type: 'Superscript',
            content: [
              'TMR'
            ]
          },
          ' band intensity was\n                            normalized by the sum of the band intensities Halo',
          {
            type: 'Superscript',
            content: [
              'TMR'
            ]
          },
          '-LC3B and Halo',
          {
            type: 'Superscript',
            content: [
              'TMR'
            ]
          },
          '.\n                            Mean values of data from three experiments are shown with red points that are traced by\n                            lines.\n                        '
        ]
      },
      {
        "type": "List",
        "items": [
          {
            "type": "ListItem",
            "content": [
              {
                "type": "Paragraph",
                "content": [
                  "Representation of βCDR3aa networks from DPCD3",
                  { "type": "Superscript", "content": ["−"] },
                  ", DPCD3",
                  { "type": "Superscript", "content": ["+"] },
                  " and CD8+. Each dot represents a single CDR3. Dot are connected (forming clusters) by edges defined by Levenshtein distance of ≤1 (one AA substitution/insertion/deletion)."
                ]
              }
            ]
          },
          {
            "type": "ListItem",
            "content": [
              {
                "type": "Paragraph",
                "content": [
                  "Percentage of clustered βCDR3aa. (*p=0.0152 and ****p<0.0001, Mann-Whitney test)."
                ]
              }
            ]
          },
          {
            "type": "ListItem",
            "content": [
              {
                "type": "Paragraph",
                "content": [
                  "βCDR3aa clustered from DPCD3",
                  { "type": "Superscript", "content": ["+"] },
                  " and ThyCD8. Each dot represents a single βCDR3aa. The colour scale represents the number of neighbours for each CDR3. Blue dots have only 1 connection while Red dots have more than 3 connections (up to 30)."
                ]
              }
            ]
          },
          {
            "type": "ListItem",
            "content": [
              {
                "type": "Paragraph",
                "content": [
                  "Degree of clustered βCDR3aa. (****p<0.0001, Mann-Whitney test)."
                ]
              }
            ]
          },
          {
            "type": "ListItem",
            "content": [
              {
                "type": "Paragraph",
                "content": [
                  "Generation probability of dispersed and clustered βCDR3aa in DPCD3+ or CD8+ cells. ****p<0.0001, Mann-Whitney test)."
                ]
              }
            ]
          },
          {
            "type": "ListItem",
            "content": [
              {
                "type": "Paragraph",
                "content": [
                  "Correlation between ",
                  { "type": "Emphasis", "content": ["Pgen"] },
                  " and βCDR3 number of connections in the CD8",
                  { "type": "Superscript", "content": ["+"] },
                  " thymocyte repertoire. Contour plot represent the generation probability as a function of βCDR3 connections in the CD8",
                  { "type": "Superscript", "content": ["+"] },
                  " thymocytes for donor P29. Linear regression curves between ",
                  { "type": "Emphasis", "content": ["Pgen"] },
                  " and number of connections are represented as red dotted lines (“y” represent the regression curve’s equation). Pearson correlation coefficient “R” and p-value “p” are calculated for each individual (",
                  {
                    "type": "Link",
                    "relation": "fig",
                    "target": "#figS3",
                    "content": ["Supplementary Figure 3C"]
                  },
                  ")."
                ]
              }
            ]
          },
          {
            "type": "ListItem",
            "content": [
              {
                "type": "Paragraph",
                "content": [
                  "PCA analysis of TRB VJ gene combinations in CD8 thymocytes. Blue: dispersed nodes; Red: clustered nodes."
                ]
              }
            ]
          }
        ],
        "order": "Ascending"
      }
    ],
    label: 'Figure 1.',
    content: [
      {
        type: 'ImageObject',
        contentUrl: 'https://via.placeholder.com/500x300/087ACC/FFFFFF?text=figure+image',
        meta: {
          inline: false
        }
      }
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'To implement the tagged LC3 processing assay in mammalian cells, we searched for a\n                    protein tag that could be made resistant to lysosomal proteases and thus would not accumulate in\n                    lysosomes constitutively. Since ligand binding is known to increase a protein’s thermal stability (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c3',
            content: [
              'Celej\n                        et al., 2003'
            ]
          },
          ';\n                        ',
          {
            type: 'Cite',
            target: 'c46',
            content: [
              'Vedadi et al., 2006\n                        '
            ]
          }
        ]
      },
      '\n                    ) and proteolytic resistance (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c44',
            content: [
              '\n                        Stankunas et al., 2003'
            ]
          },
          '; ',
          {
            type: 'Cite',
            target: 'c39',
            content: [
              'Park and Marqusee, 2005'
            ]
          },
          ';\n                        ',
          {
            type: 'Cite',
            target: 'c16',
            content: [
              'Kaur et al., 2018\n                        '
            ]
          }
        ]
      },
      '\n                    ), we selected two protein tags that covalently bind with their respective ligands as candidate\n                    tags: Halo (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c27',
            content: [
              'Los et al., 2008\n                        '
            ]
          }
        ]
      },
      '\n                    ) and SNAP-tag (SNAP) (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c18',
            content: [
              'Keppler et al.,\n                            2003\n                        '
            ]
          }
        ]
      },
      '\n                    ).\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'HeLa cells stably expressing Halo-LC3B or SNAP-LC3B were exposed to their respective\n                    tetramethylrhodamine (TMR)-conjugated ligands for 20 min and then washed of the ligands. After 6 h\n                    of starvation, a starvation-induced decrease in labeled and unlabeled Halo-LC3B was observed by\n                    immunoblotting and, for labeled Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-LC3B, in-gel fluorescence detection (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'Figure 1b'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Strikingly, free Halo was detected only for Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-LC3B. The decrease in Halo-LC3B\n                    and Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-LC3B levels and appearance of free Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      ' were dependent on\n                    autophagy and lysosomal enzymatic activity as they were suppressed in ',
      {
        type: 'Emphasis',
        content: [
          'FIP200\n                    '
        ]
      },
      ' KO cells (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  '\n                            Figure 1b'
                ]
              },
              '–\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'c'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ) and by the lysosomal inhibitor bafilomycin A1 (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'Figure 1c'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Removal of the ligand was enough to prevent further labeling (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1_S1',
                content: [
                  'Figure 1— figure\n                                supplement 1\n                            '
                ]
              }
            ]
          }
        ]
      },
      '\n                    , compare lanes 8–10), avoiding the need for a blocking agent. In contrast, the generation of free\n                    SNAP was not detected from ligand-free and ligand-bound SNAP-LC3 during starvation (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'Figure 1d'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Taken together, these data indicate that ligand-free Halo is susceptible to proteolysis but,\n                    unlike SNAP, Halo becomes resistant to proteolysis after covalently binding to its ligand and\n                    persists in lysosomes (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'Figure 1e'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Therefore, autophagic flux can be quantitatively determined with pulse-chasable Halo-based\n                    reporters.\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'To assess the sensitivity and linearity of Halo-LC3B processing to the levels of\n                    autophagic activity, we obtained results for several time points between 0 to 8 h of starvation. The\n                    amount of free Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      ' generated from Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-LC3B was detected as early as\n                    0.5 h of starvation and increased over time (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'Figure 1f'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Calculation of the ratio of released Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      ' to total Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      ' (Halo',
      {
        type: 'Superscript',
        content: [
          '\n                        TMR'
        ]
      },
      '-LC3B + Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      ') showed a linear increase of free Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      ' levels\n                    that was readily reproducible (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig1',
                content: [
                  'Figure 1g'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). The advantages of the processing assay are: (1) pulse-labeling ensures that the starting amount\n                    of Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-LC3B is relatively the same for each experimental condition (here, each time\n                    point), (2) the amount of free Halo is a positive readout (i.e., a signal is produced rather than\n                    reduced by autophagy), and (3) quantifying the amount of free Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      ' produced is\n                    self-contained without the need for additional controls such as a lysosomal inhibitor control or a\n                    loading control. The Halo-LC3B processing assay is thus a simple and sensitive method with a wide\n                    linear range to quantitatively monitor autophagic flux in mammalian cells.\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's2b',
    depth: 2,
    content: [
      'HaloTag-based reporters to monitor autophagic flux by fluorescence microscopy\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Next, we visualized the localization of mGFP-LC3B, mRFP-LC3B, and Halo-LC3B in HeLa\n                    cells. The number of mGFP-LC3B puncta increased during the first 2 h of starvation but did not\n                    increase thereafter (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2a'
                ]
              },
              '\n                            and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'c'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ), which is likely due to the quenching of mGFP signal in autolysosomes (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c19',
            content: [
              'Kimura et al., 2007\n                        '
            ]
          }
        ]
      },
      '\n                    ). Under growing conditions, many mRFP-LC3B puncta were already present and their high rate of\n                    colocalization with LysoTracker revealed them to be lysosomes (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2a'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ), demonstrating mRFP’s stability in acidic compartments (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c15',
            content: [
              'Katayama et al.,\n                            2008\n                        '
            ]
          }
        ]
      },
      '\n                    ). Furthermore, an increase in the number of mRFP-LC3B puncta during starvation was not detected (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2a'
                ]
              },
              '\n                            and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'c'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ), likely because the formation of mRFP-LC3B-marked autophagosomes was masked by the pre-existing\n                    intense lysosomal mRFP signal (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c15',
            content: [
              'Katayama et al.,\n                            2008\n                        '
            ]
          }
        ]
      },
      '\n                    ). Contrastingly, Halo-LC3B that was labeled with ligand conjugated to fluorogenic SaraFluor 650T\n                    (SF650) demonstrated only a few faint punctate structures immediately after labeling, and starvation\n                    induced a continuous increase in the number of Halo',
      {
        type: 'Superscript',
        content: [
          'SF650'
        ]
      },
      '-positive puncta over time (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2b'
                ]
              },
              '\n                            and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'c'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Many of the Halo',
      {
        type: 'Superscript',
        content: [
          'SF650'
        ]
      },
      '-positive puncta are autolysosomes as they colocalized with\n                    LysoTracker (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2a'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ) and the lysosomal membrane protein LAMP1 (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2_S1',
                content: [
                  'Figure 2—figure\n                                supplement 1a\n                            '
                ]
              }
            ]
          }
        ]
      },
      '\n                    ), which shows that Halo',
      {
        type: 'Superscript',
        content: [
          'SF650'
        ]
      },
      ' is stable in acidic lysosomes. Although autophagosomes\n                    cannot be distinguished from autolysosomes with Halo-LC3, the number of ligand-bound Halo puncta\n                    formed following pulse-labeling of Halo-based reporters can indicate autophagic flux \n \n ARTi.6588 – target site: TCCGGATGAAGTTTATATCGAA / shRNAmir (97mer): TGCTGTTGACAGTGAGCGCCCGGATGAAGTTTATATCGAATAGTGAAGCCACAGATGTATTCGATATAAACTTCAT CCGGATGCCTACTGCCTCGGA                '
    ]
  },
  {
    type: 'Figure',
    id: 'fig2',
    caption: [
      {
        type: 'Heading',
        content:
          'HaloTag-based reporters can be used to examine autophagic flux by fluorescence\n                            imaging.\n                        ',
        depth: 4,
        id: 'fig2-heading',
      },
      {
        type: 'Paragraph',
        content: [
          '(',
          {
            type: 'Strong',
            content: [
              'a'
            ]
          },
          ') Fluorescence images of wild-type HeLa cells stably expressing\n                            mGFP-LC3B or mRFP-LC3B in nutrient-rich medium or after 2 h in starvation medium containing\n                            75 nM LysoTracker Deep Red. (',
          {
            type: 'Strong',
            content: [
              'b'
            ]
          },
          ') Fluorescence images of wild-type HeLa cells\n                            stably expressing HaloTag (Halo)-LC3B labeled with SF650-conjugated ligand. The cells were\n                            in nutrient-rich or incubated for 2 h in starvation medium containing 200 nM of\n                            SF650-conjugated ligand and 75 nM LysoTracker Red. Arrows point to Halo puncta without\n                            LysoTracker signal that represent autophagosomes. (',
          {
            type: 'Strong',
            content: [
              'c'
            ]
          },
          ') Quantification of mGFP,\n                            mRFP, or Halo',
          {
            type: 'Superscript',
            content: [
              'SF650'
            ]
          },
          ' puncta in the cells of (a) and (b). ',
          {
            type: 'Emphasis',
            content: [
              'n\n                            '
            ]
          },
          ' = 87–99 cells. (',
          {
            type: 'Strong',
            content: [
              'd'
            ]
          },
          ') Schematic of fluorescence changes of fluorescent\n                            ligand-bound Halo-LC3B and Halo-mGFP-LC3B in autophagosomes and autolysosomes. Halo',
          {
            type: 'Superscript',
            content: [
              '\n                                ligand\n                            '
            ]
          },
          ' stays fluorescent and stable whereas mGFP is quenched and degraded in autolysosomes.\n                            With Halo-mGFP-LC3B, autophagosomes appear as double-positive (Halo',
          {
            type: 'Superscript',
            content: [
              'ligand'
            ]
          },
          ' and\n                            mGFP) puncta while autolysosomes appear as single-positive (Halo',
          {
            type: 'Superscript',
            content: [
              'ligand'
            ]
          },
          ' only)\n                            puncta. (',
          {
            type: 'Strong',
            content: [
              'e'
            ]
          },
          ') Fluorescence images of wild-type HeLa cells stably expressing\n                            Halo-mGFP-LC3B labeled with SF650-conjugated ligand. The cells were growing, starved, or\n                            starved with 100 nM bafilomycin A1 (BafA) for 2 h in medium containing 200 nM of\n                            SF650-conjugated ligand and 75 nM LysoTracker Red. Arrowheads point to Halo',
          {
            type: 'Superscript',
            content: [
              '+'
            ]
          },
          'mGFP',
          {
            type: 'Superscript',
            content: [
              '\n                                +\n                            '
            ]
          },
          ' puncta that represent autophagosomes; arrows point to Halo',
          {
            type: 'Superscript',
            content: [
              '+'
            ]
          },
          'mGFP',
          {
            type: 'Superscript',
            content: [
              '−\n                            '
            ]
          },
          ' puncta that represent autolysosomes. (',
          {
            type: 'Strong',
            content: [
              'f'
            ]
          },
          ') Quantification of Halo',
          {
            type: 'Superscript',
            content: [
              '\n                                SF650+'
            ]
          },
          'mGFP',
          {
            type: 'Superscript',
            content: [
              '+'
            ]
          },
          ' puncta representing autophagosomes and Halo',
          {
            type: 'Superscript',
            content: [
              '\n                                SF650+'
            ]
          },
          'mGFP',
          {
            type: 'Superscript',
            content: [
              '−'
            ]
          },
          ' puncta representing autolysosomes in cells shown in (e). ',
          {
            type: 'Emphasis',
            content: [
              'n\n                            '
            ]
          },
          ' = 86–101 cells. Scale bar = 10 µm (main), 2 µm (magnified images) (a,b,e). In box\n                            plots, solid bars indicate medians, boxes indicate the interquartile range (25th to 75th\n                            percentile), and whiskers indicate the largest and smallest values within 1.5 times the\n                            interquartile range (c,f).\n                        '
        ]
      }
    ],
    label: 'Figure 2.',
    content: [
      {
        type: 'ImageObject',
        contentUrl: 'https://via.placeholder.com/500x300/087ACC/FFFFFF?text=figure+image',
        meta: {
          inline: false
        }
      }
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'The minimal lysosomal background signal of the Halo-based assay prompted us to use Halo\n                    instead of mRFP in the established mRFP-EGFP-LC3B reporter (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2d'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ) (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c19',
            content: [
              'Kimura et al., 2007\n                        '
            ]
          }
        ]
      },
      '\n                    ). This reporter was originally developed to distinguish between RFP-positive GFP-positive (RFP',
      {
        type: 'Superscript',
        content: [
          '\n                        +'
        ]
      },
      'GFP',
      {
        type: 'Superscript',
        content: [
          '+'
        ]
      },
      ') autophagosomes and RFP-positive GFP-negative (RFP',
      {
        type: 'Superscript',
        content: [
          '+'
        ]
      },
      'GFP',
      {
        type: 'Superscript',
        content: [
          '\n                        −'
        ]
      },
      ') autolysosomes, but the constitutive accumulation of RFP in lysosomes often hinders the\n                    detection of newly generated autolysosomes (RFP',
      {
        type: 'Superscript',
        content: [
          '+'
        ]
      },
      'GFP',
      {
        type: 'Superscript',
        content: [
          '−'
        ]
      },
      ') (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2_S1',
                content: [
                  'Figure 2—figure\n                                supplement 1b\n                            '
                ]
              },
              '\n                            and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2_S1',
                content: [
                  'c'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). In contrast, Halo',
      {
        type: 'Superscript',
        content: [
          'SF650'
        ]
      },
      '-mGFP-LC3 was mostly cytosolic immediately after labeling (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2e'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Starvation induced the formation of Halo',
      {
        type: 'Superscript',
        content: [
          'SF650+'
        ]
      },
      'mGFP',
      {
        type: 'Superscript',
        content: [
          '+'
        ]
      },
      ' puncta that represent\n                    autophagosomes (arrowheads,\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2e'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ) and Halo',
      {
        type: 'Superscript',
        content: [
          'SF650+'
        ]
      },
      'mGFP',
      {
        type: 'Superscript',
        content: [
          '−'
        ]
      },
      ' puncta that represent autolysosomes (arrows,\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2e'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ) as confirmed by their colocalization with LysoTracker or LAMP1 (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2e'
                ]
              },
              '\n                            and ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'f'
                ]
              },
              ',\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2_S1',
                content: [
                  'Figure 2—figure\n                                supplement 1d\n                            '
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Adding the lysosomal inhibitor bafilomycin A1 (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c22',
            content: [
              '\n                        Klionsky et al., 2008'
            ]
          },
          ';\n                        ',
          {
            type: 'Cite',
            target: 'c28',
            content: [
              'Mauvezin et al.,\n                            2015\n                        '
            ]
          }
        ]
      },
      '\n                    ) suppressed the formation of Halo',
      {
        type: 'Superscript',
        content: [
          'SF650+'
        ]
      },
      'mGFP',
      {
        type: 'Superscript',
        content: [
          '−'
        ]
      },
      ' autolysosomes completely,\n                    resulting in the accumulation of Halo',
      {
        type: 'Superscript',
        content: [
          'SF650+'
        ]
      },
      'mGFP',
      {
        type: 'Superscript',
        content: [
          '+'
        ]
      },
      ' autophagosomes (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'Figure 2e'
                ]
              },
              '\n                            and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2',
                content: [
                  'f'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Hence, the lack of pre-existing lysosomal accumulation afforded by its pulse-labelable nature\n                    makes Halo-mGFP-LC3B a preferable alternative to mRFP-EGFP-LC3B as a fluorescence microscopy-based\n                    autophagic flux reporter.\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'We also generated Halo-mGFP-LC3B-mRFP as a modified version of the EGFP-LC3B-mRFP\n                    reporter (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c13',
            content: [
              'Kaizuka et al.,\n                            2016\n                        '
            ]
          }
        ]
      },
      '\n                    ). With the original EGFP-LC3B-mRFP reporter, autophagic flux can be estimated from GFP:RFP\n                    fluorescence ratio because this reporter is cleaved into EGFP-LC3B and mRFP by ATG4 and only\n                    EGFP-LC3B is degraded by autophagy since mRFP remains in the cytosol (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c13',
            content: [
              'Kaizuka et al.,\n                            2016\n                        '
            ]
          }
        ]
      },
      '\n                    ). Adding Halo at the N-terminus of mGFP-LC3B-mRFP yielded a reporter that can be used in the\n                    processing assay (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2_S1',
                content: [
                  'Figure 2—figure\n                                supplement 1e\n                            '
                ]
              }
            ]
          }
        ]
      },
      '\n                    ), the autophagosome/autolysosome formation assay (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2_S1',
                content: [
                  'Figure 2—figure\n                                supplement 1f\n                            '
                ]
              }
            ]
          }
        ]
      },
      '\n                    ), and the GFP:RFP ratiometry assay (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig2_S1',
                content: [
                  'Figure 2— figure\n                                supplement 1g\n                            '
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Thus, Halo-mGFP-LC3B-mRFP can be used as a stably expressed ‘three-in-one’ reporter.\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'In summary, pulse-chasable Halo-based reporters are suitable for monitoring autophagic\n                    flux by fluorescence microscopy in addition to the processing assay readout.\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's2c',
    depth: 2,
    content: [
      'The HaloTag-based processing assay can be adapted to monitor selective autophagy\n                    pathways\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'A major advantage of the yeast GFP-Atg8 processing assay is its versatility: Atg8 can\n                    be replaced with a protein of interest to monitor the activity of selective autophagy, such as\n                    endoplasmic reticulum (ER)-phagy and mitophagy. Hence, we prepared Halo-mGFP-KDEL that localizes to\n                    the ER lumen (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3_S1',
                content: [
                  'Figure 3—figure\n                                supplement 1a\n                            '
                ]
              }
            ]
          }
        ]
      },
      '\n                    ) and pSu9-Halo-mGFP that localizes to the mitochondrial matrix (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3_S1',
                content: [
                  'Figure 3—figure\n                                supplement 1b\n                            '
                ]
              }
            ]
          }
        ]
      },
      '\n                    ).\n                '
    ]
  },
  {
    type: 'Figure',
    id: 'fig3',
    caption: [
      {
        type: 'Heading',
        content:
          'HaloTag-based reporters can be adapted to monitor selective autophagy.',
        depth: 4,
        id: 'fig3-heading'
      },
      {
        type: 'Paragraph',
        content: [
          '(',
          {
            type: 'Strong',
            content: [
              'a'
            ]
          },
          ') Immunoblotting and in-gel fluorescence detection of wild-type\n                            and ',
          {
            type: 'Emphasis',
            content: [
              'FIP200'
            ]
          },
          ' knockout (KO) HeLa cells stably expressing HaloTag\n                            (Halo)-mGFP-KDEL pulse-labeled for 20 min with 100 nM TMR-conjugated ligand in nutrient-rich\n                            medium. The cells were collected or incubated for 6 h in starvation medium. (',
          {
            type: 'Strong',
            content: [
              'b'
            ]
          },
          ')\n                            Quantification of Halo band intensities in (a). ',
          {
            type: 'Emphasis',
            content: [
              'n'
            ]
          },
          ' = 3\n                            experiments. (',
          {
            type: 'Strong',
            content: [
              'c'
            ]
          },
          ') Immunoblotting of total cell lysates from wild-type HeLa cells\n                            in nutrient-rich medium or after 6 h in starvation medium. (',
          {
            type: 'Strong',
            content: [
              'd'
            ]
          },
          ') Quantification\n                            of band intensities for the indicated proteins in (c). ',
          {
            type: 'Emphasis',
            content: [
              'n'
            ]
          },
          ' = 3\n                            experiments. (',
          {
            type: 'Strong',
            content: [
              'e'
            ]
          },
          ') Fluorescence images of the cells described in (a) under\n                            nutrient-rich or for 6 h under starvation conditions. The media contained 200 nM\n                            SF650-conjugated ligand and 75 nM LysoTracker Red. Arrows point to Halo',
          {
            type: 'Superscript',
            content: [
              'SF650+'
            ]
          },
          'mGFP',
          {
            type: 'Superscript',
            content: [
              '\n                                −\n                            '
            ]
          },
          ' puncta representing autolysosomes. (',
          {
            type: 'Strong',
            content: [
              'f'
            ]
          },
          ') Quantification of Halo',
          {
            type: 'Superscript',
            content: [
              '\n                                SF650+'
            ]
          },
          'mGFP',
          {
            type: 'Superscript',
            content: [
              '−'
            ]
          },
          ' puncta that represent autolysosomes in cells shown in (e). ',
          {
            type: 'Emphasis',
            content: [
              'n\n                            '
            ]
          },
          ' = 111–115 cells. (',
          {
            type: 'Strong',
            content: [
              'g'
            ]
          },
          ') Immunoblotting and in-gel fluorescence detection\n                            of total cell lysates from wild-type or ',
          {
            type: 'Emphasis',
            content: [
              'FIP200'
            ]
          },
          ' KO HeLa cells\n                            stably expressing pSu9-Halo-mGFP only or together with HA-Parkin. After pulse-labeling with\n                            100 nM TMR ligand in nutrient-rich medium, the cells were collected or incubated for 6 h in\n                            nutrient-rich medium containing 1 μM oligomycin and 2 μM antimycin (OA collectively).\n                            (',
          {
            type: 'Strong',
            content: [
              'h'
            ]
          },
          ') Quantification of Halo band intensities in (g). (',
          {
            type: 'Strong',
            content: [
              'i'
            ]
          },
          ')\n                            Fluorescence images of wild-type and ',
          {
            type: 'Emphasis',
            content: [
              'FIP200'
            ]
          },
          ' KO HeLa cells\n                            stably expressing pSu9-Halo-mGFP and HA-Parkin. The cells were in nutrient-rich medium\n                            containing 200 nM SF650 ligand, 75 nM LysoTracker Red, with or without OA. Arrows point to\n                            Halo',
          {
            type: 'Superscript',
            content: [
              'SF650+'
            ]
          },
          'mGFP',
          {
            type: 'Superscript',
            content: [
              '−'
            ]
          },
          ' puncta that represent autolysosomes. (',
          {
            type: 'Strong',
            content: [
              'j'
            ]
          },
          ')\n                            Quantification of Halo',
          {
            type: 'Superscript',
            content: [
              'SF650+'
            ]
          },
          'mGFP',
          {
            type: 'Superscript',
            content: [
              '−'
            ]
          },
          ' puncta in cells shown in (i). ',
          {
            type: 'Emphasis',
            content: [
              'n\n                            '
            ]
          },
          ' = 99 cells. Scale bar = 10 µm (main), 2 µm (magnified images) (e,i). In box plots,\n                            solid bars indicate medians, boxes indicate the interquartile range (25',
          {
            type: 'Superscript',
            content: [
              'th'
            ]
          },
          ' to 75',
          {
            type: 'Superscript',
            content: [
              '\n                                th\n                            '
            ]
          },
          ' percentile), and whiskers indicate the largest and smallest values within 1.5 times\n                            the interquartile range (f,j).\n                        '
        ]
      }
    ],
    label: 'Figure 3.',
    content: [
      {
        type: 'ImageObject',
        contentUrl: 'https://via.placeholder.com/500x300/087ACC/FFFFFF?text=figure+image',
        meta: {
          inline: false
        }
      }
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      ' was generated from pulse-labeled Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-mGFP-KDEL in a\n                    FIP200-dependent manner upon starvation (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3',
                content: [
                  'Figure 3a'
                ]
              },
              '\n                            and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3',
                content: [
                  'b'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Production of free Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      ' was a clearer indicator of ER-phagy than the reduction in\n                    ER protein levels (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3',
                content: [
                  '\n                            Figure 3a'
                ]
              },
              '–b vs.\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3',
                content: [
                  '3c–d'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). With fluorescence microscopy, ER-phagy flux was detected by the formation of Halo',
      {
        type: 'Superscript',
        content: [
          '\n                        SF650+'
        ]
      },
      'mGFP',
      {
        type: 'Superscript',
        content: [
          '−'
        ]
      },
      ' puncta that colocalized with LysoTracker (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3',
                content: [
                  'Figure 3e'
                ]
              },
              '\n                            and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3',
                content: [
                  'f'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ) and LAMP1 (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3_S1',
                content: [
                  'Figure 3—figure\n                                supplement 1c\n                            '
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Similarly, Parkin-mediated mitophagic activity induced by oligomycin and antimycin treatment was\n                    detected by pSu9-Halo-mGFP processing (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3',
                content: [
                  'Figure 3g'
                ]
              },
              '\n                            and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3',
                content: [
                  'h'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ) as well as the formation of Halo',
      {
        type: 'Superscript',
        content: [
          'SF650+'
        ]
      },
      'mGFP',
      {
        type: 'Superscript',
        content: [
          '−'
        ]
      },
      ' puncta colocalized with the\n                    lysosome (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3',
                content: [
                  'Figure 3i'
                ]
              },
              '\n                            and ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3',
                content: [
                  'j'
                ]
              },
              ',\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig3_S1',
                content: [
                  'Figure 3—figure\n                                supplement 1d\n                            '
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Therefore, the Halo-based assays can be adapted to monitor selective autophagic flux.\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's2d',
    depth: 2,
    content: [
      'Bulk nonselective autophagic flux can be detected with the HaloTag-based\n                    processing assay\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Finally, we examined whether the Halo-based processing assay could be used to detect\n                    bulk nonselective autophagic flux, which more accurately reflects total autophagic flux compared to\n                    LC3-based methods since LC3 and GABARAP family proteins are preferentially degraded by autophagy (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c21',
            content: [
              'Klionsky et al.,\n                            2021\n                        '
            ]
          }
        ]
      },
      '\n                    ). To monitor nonselective clearance of cytosolic material, we constructed Halo-mGFP, which should\n                    be taken up randomly into autophagosomes or lysosomes like the yeast Pgk1-GFP reporter (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c47',
            content: [
              'Welter et al., 2010\n                        '
            ]
          }
        ]
      },
      '\n                    ).\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Despite occurring at much lower levels than LC3-dependent autophagic flux detected by\n                    Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-LC3B, the lack of lysosomal background allowed us to detect the generation of\n                    free Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      ' from pulse-labeled Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-mGFP (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4',
                content: [
                  'Figure 4a'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Accordingly, we were able to track the progression of starvation-induced bulk nonselective\n                    autophagic flux over time by Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-mGFP processing (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4',
                content: [
                  'Figure 4b'
                ]
              },
              '\n                            and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4',
                content: [
                  'c'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ) and by visualizing the gradual accumulation of Halo',
      {
        type: 'Superscript',
        content: [
          'SF650'
        ]
      },
      ' signal in the lysosomes of\n                    cells stably expressing Halo-mGFP labeled with SF650 ligand (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4',
                content: [
                  'Figure 4d'
                ]
              },
              '\n                            and ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4',
                content: [
                  'e'
                ]
              },
              ', ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4_S1',
                content: [
                  'Figure 4—figure\n                            supplement 1a\n                        '
                ]
              },
              ' and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4_S1',
                content: [
                  'b'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-mGFP processing and Halo',
      {
        type: 'Superscript',
        content: [
          'SF650'
        ]
      },
      ' puncta formation were not observed in ',
      {
        type: 'Emphasis',
        content: [
          'FIP200\n                    '
        ]
      },
      ' KO cells (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4',
                content: [
                  'Figure 4a'
                ]
              },
              '\n                            and\n                            ',
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4',
                content: [
                  'd'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ). In contrast, Halo',
      {
        type: 'Superscript',
        content: [
          'TMR'
        ]
      },
      '-mGFP processing was slightly detected in ',
      {
        type: 'Emphasis',
        content: [
          '\n                        ATG3\n                    '
        ]
      },
      ' KO and ',
      {
        type: 'Emphasis',
        content: [
          'ATG5'
        ]
      },
      ' KO cells (\n                    ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4',
                content: [
                  'Figure 4a'
                ]
              }
            ]
          }
        ]
      },
      '\n                    ), which is consistent with our previous finding that the ATG conjugation systems are not completely\n                    essential in mammalian cells (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c45',
            content: [
              'Tsuboyama et al.,\n                            2016\n                        '
            ]
          }
        ]
      },
      '\n                    ). These results show that the Halo-GFP processing assay can be used to monitor bulk nonselective\n                    autophagic flux, even in cells lacking ATG conjugation system components.\n                '
    ]
  },
  {
    type: 'Figure',
    id: 'fig4',
    caption: [
      {
        type: 'Paragraph',
        content: [
          'Bulk nonselective autophagic flux can be detected with HaloTag-GFP. (',
          {
            type: 'Strong',
            content: [
              '\n                            a'
            ]
          },
          ',',
          {
            type: 'Strong',
            content: [
              'b'
            ]
          },
          ') Immunoblotting and in-gel fluorescence detection of total cell\n                            lysates from wild-type, ',
          {
            type: 'Emphasis',
            content: [
              'FIP200'
            ]
          },
          ' KO, ',
          {
            type: 'Emphasis',
            content: [
              'ATG3\n                            '
            ]
          },
          ' KO, and ',
          {
            type: 'Emphasis',
            content: [
              'ATG5'
            ]
          },
          ' KO HeLa cells stably expressing HaloTag\n                            (Halo)-LC3B (a) or Halo-mGFP (a,b). After pulse-labeling for 20 min with 100 nM\n                            TMR-conjugated ligand in nutrient-rich medium, the cells were collected or incubated for 6 h\n                            (a) or the indicated times (b) in starvation medium. (',
          {
            type: 'Strong',
            content: [
              'c'
            ]
          },
          ') Quantification of time\n                            course results shown in (b). Mean values of three experiments are shown with red points that\n                            are traced with lines. (',
          {
            type: 'Strong',
            content: [
              'd'
            ]
          },
          ') Fluorescence images of wild-type and ',
          {
            type: 'Emphasis',
            content: [
              'FIP200\n                            '
            ]
          },
          ' KO HeLa cells stably expressing Halo-mGFP in nutrient-rich medium or after 6 h of\n                            starvation. The media contained 200 nM of SF650-conjugated ligand. Scale bar = 10 µm (main),\n                            2 µm (magnified images). (',
          {
            type: 'Strong',
            content: [
              'e'
            ]
          },
          ') Quantification of the area of Halo',
          {
            type: 'Superscript',
            content: [
              'SF650'
            ]
          },
          ' signal\n                            that exceeded a 98',
          {
            type: 'Superscript',
            content: [
              'th'
            ]
          },
          ' percentile intensity threshold in cells described in (d) at\n                            the indicated durations of starvation. ',
          {
            type: 'Emphasis',
            content: [
              'n ='
            ]
          },
          ' 42–48 cells. In box\n                            plots, solid bars indicate medians, boxes indicate the interquartile range (25',
          {
            type: 'Superscript',
            content: [
              'th'
            ]
          },
          ' to\n                            75',
          {
            type: 'Superscript',
            content: [
              'th'
            ]
          },
          ' percentile), and whiskers indicate the largest and smallest values within\n                            1.5 times the interquartile range.\n                        '
        ]
      }
    ],
    label: 'Figure 4.',
    content: [
      {
        type: 'ImageObject',
        contentUrl: 'https://via.placeholder.com/500x300/087ACC/FFFFFF?text=figure+image',
        meta: {
          inline: false
        }
      }
    ]
  },
  {
    type: 'Heading',
    id: 's3',
    depth: 1,
    content: [
      'Discussion'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'It is generally difficult to implement the autophagic flux assays currently available for\n                mammalian cells. In this study, we showed that the Halo-based processing assay is a simple yet effective\n                way to quantitatively monitor various forms of autophagic flux in mammalian cells, from LC3-dependent\n                autophagic flux to bulk nonselective autophagy. While this manuscript was being prepared, an independent\n                study on the use of Halo-based reporters to monitor autophagic flux was published (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c40',
            content: [
              'Rudinskiy et al., 2022\n                    '
            ]
          }
        ]
      },
      '\n                ). In contrast to our main aim of developing a reporter processing assay for mammalian cells, Rudinskiy\n                et al. sought to overcome the issue of lysosomal RFP accumulation with Halo-based reporters that can be\n                fluorescently ‘activated’ upon binding to fluorescent ligands. Our study demonstrated that the\n                ‘activation’ of Halo-based reporters is achieved not only by the introduction of fluorescent Halo ligand\n                but, importantly, also by the stabilization of Halo against proteolysis after ligand binding.\n            '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'The labeling-induced stabilization of Halo lends the Halo-based processing assay several\n                advantages over currently available methods. Firstly, pulse-labeling removes the need for a lysosomal\n                inhibitor control that may affect transcription/translation. Secondly, the reporter produces minimal\n                background noise since it does not accumulate within lysosomes prior to its labeling. Thirdly, the\n                release of labeled Halo occurs only when the reporter is processed in lysosomes, which makes it\n                unambiguously autophagy-dependent. Fourthly, reporter processing can be detected by immunoblotting,\n                which is a widely available and commonly used laboratory technique. It can also be detected by in-gel\n                imaging if available, which would reduce the time required to obtain results. Lastly, by replacing the\n                partner protein of Halo, users can easily adapt the assay to monitor their autophagy pathway of interest\n                or the autophagic clearance of a protein of interest.\n            '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'The assay does have limitations. One that is inevitable is the need for exogenous\n                expression. For experiments that are sensitive to variation in expression levels, clonal isolation may\n                be required. Furthermore, the cost of Halo ligands might be prohibitive. A more cost-effective\n                alternative could be the non-fluorescent Halo ligands, such as 7-bromoheptanol, which were developed as\n                blocking agents (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c29',
            content: [
              'Merrill et al., 2019\n                    '
            ]
          }
        ]
      },
      '\n                ), and Halo band detection would be achieved only by immunoblotting. Another limitation is the\n                difficulty in quantifying the absolute rate of reporter incorporation into lysosomes precisely due to\n                the gradual degradation of even Halo',
      {
        type: 'Superscript',
        content: [
          'ligand'
        ]
      },
      '. Additionally, the need to electrophoretically\n                separate the full-length reporter from the free Halo',
      {
        type: 'Superscript',
        content: [
          'ligand'
        ]
      },
      ' band limits the use of this assay\n                for large-scale screening. However, the good signal-to-noise ratio of Halo reporters in fluorescent\n                imaging makes them ideal reporters for microscopy-based high-content screening in the same manner as was\n                achieved with GFP-LC3 (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c38',
            content: [
              'Orvedahl et al., 2011\n                    '
            ]
          }
        ]
      },
      '\n                ;\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c24',
            content: [
              'Koepke et al., 2020\n                    '
            ]
          }
        ]
      },
      '\n                ) and dual-fluorescent Rosella-LC3 (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c1',
            content: [
              'Arias-Fuenzalida et al.,\n                        2019\n                    '
            ]
          }
        ]
      },
      '\n                ).\n            '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'We anticipate the Halo-based processing assay to be useful to most studies on mammalian\n                autophagy and lysosome-dependent protein clearance. With Halo-GFP, researchers can investigate the\n                contribution of autophagy proteins by examining whether altering a protein by\n                depletion/inhibition/mutation will affect nonselective autophagic flux. This may be especially useful to\n                researchers investigating proteins that are directly required for commonly used autophagic flux assays,\n                such as factors involved in the LC3 or GABARAP conjugation systems. Indeed, we managed to detect low\n                levels of autophagic flux in ',
      {
        type: 'Emphasis',
        content: [
          'ATG3'
        ]
      },
      ' KO and ',
      {
        type: 'Emphasis',
        content: [
          'ATG5\n                '
        ]
      },
      ' KO cells (\n                ',
      {
        type: 'Strong',
        content: [
          {
            type: 'Emphasis',
            content: [
              {
                type: 'Link',
                relation: 'fig',
                target: '#fig4',
                content: [
                  'Figure 4a'
                ]
              }
            ]
          }
        ]
      },
      '\n                ), which cannot be detected by conventional LC3-based assays. This result is consistent with the recent\n                consensus that, although severely reduced, autophagic flux is not completely blocked in cells lacking\n                the ATG conjugation systems (reviewed in\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c30',
            content: [
              'Mizushima, 2020'
            ]
          }
        ]
      },
      '\n                ). Halo-GFP could also potentially be used to study microautophagy. Furthermore, Halo-based reporters\n                have been successfully employed in animal models with fluorescent and radiolabeled ligands (\n                ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c4',
            content: [
              'England et al., 2015'
            ]
          }
        ]
      },
      '\n                ), suggesting that the processing assay could be an additional method for assessing ',
      {
        type: 'Emphasis',
        content: [
          'in vivo\n                '
        ]
      },
      ' autophagic flux, e.g., when comparing autophagic flux among tissues.\n            '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'In conclusion, the Halo-based processing assay can be used to monitor mammalian autophagic\n                flux quantitatively and reliably with relative ease. The Halo-based reporters can also be readily\n                observed by fluorescence microscopy. Besides serving as an alternative to conventional autophagic flux\n                assays, the Halo-based assay has a myriad of potential applications that may lead to the discovery of\n                new aspects and thus a deeper understanding of mammalian autophagy.\n            '
    ]
  },
  {
    type: 'Heading',
    id: 's4',
    depth: 1,
    content: [
      'Materials and methods'
    ]
  },
  {
    type: 'Heading',
    id: 's4a',
    depth: 2,
    content: [
      'Cell lines and culture conditions'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'HeLa cells, human embryonic kidney (HEK) 293T cells, and mouse embryonic fibroblasts\n                    (MEFs) authenticated by RIKEN were used in this study. Cells were maintained in Dulbecco’s Modified\n                    Eagle Medium (DMEM) (Sigma-Aldrich, D6546) supplemented with 10% fetal bovine serum (FBS)\n                    (Sigma-Aldrich, 173012) and 2 mM L-glutamine (Gibco, 25030-081) in a 5% CO2 incubator at 37°C. ',
      {
        type: 'Emphasis',
        content: [
          'FIP200\n                    '
        ]
      },
      ' KO HeLa cells (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c45',
            content: [
              'Tsuboyama et al.,\n                            2016\n                        '
            ]
          }
        ]
      },
      '\n                    ) and ',
      {
        type: 'Emphasis',
        content: [
          'Fip200'
        ]
      },
      ' KO MEFs (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c7',
            content: [
              'Gan et al., 2006'
            ]
          }
        ]
      },
      '\n                    ) have been described previously.\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's4b',
    depth: 2,
    content: [
      'Plasmids'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Plasmids for stable expression in HeLa cells were generated as follows: DNA fragments\n                    encoding monomeric enhanced GFP with A206K mutation (mGFP), monomeric RFP (mRFP), mRuby3\n                    (codon-optimized from Addgene #74252), HaloTag7 (Promega, N2701), or SNAP-tag (New England BioLabs,\n                    N9181S) were inserted into the retroviral plasmids pMRX-IP (harboring a puromycin-resistant marker)\n                    (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c20',
            content: [
              '\n                        Kitamura et al., 2003'
            ]
          },
          ';\n                        ',
          {
            type: 'Cite',
            target: 'c41',
            content: [
              'Saitoh et al., 2003\n                        '
            ]
          }
        ]
      },
      '\n                    ), pMRX-IB (harboring a blasticidin-resistant marker) (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c34',
            content: [
              'Morita et al., 2018\n                        '
            ]
          }
        ]
      },
      '\n                    ), or pMRX-No (without a drug resistance marker) by the seamless ligation cloning extract (SLiCE)\n                    method (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c35',
            content: [
              'Motohashi, 2017\n                        '
            ]
          }
        ]
      },
      '\n                    ). Then, DNA fragments encoding rat LC3B, the signal sequence of ',
      {
        type: 'Emphasis',
        content: [
          'Drosophila\n                    '
        ]
      },
      ' BiP (residues 1–18) and KDEL (for pMRX-IB-Halo-mGFP-KDEL), or the presequence of ',
      {
        type: 'Emphasis',
        content: [
          'N. crassa\n                    '
        ]
      },
      ' Fo-ATPase subunit 9 (residues 1–69; for pMRX-IB-pSu9-Halo-mGFP) were inserted into the\n                    pMRX-IP-, pMRX-IB-, pMRX-No-based plasmids by the SLiCE method. mRFP-GFP-LC3B in pMXs was described\n                    previously (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c10',
            content: [
              'Jiang et al., 2014\n                        '
            ]
          }
        ]
      },
      '\n                    ). Primers used in this study are listed in Supplementary Table 1.\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's4c',
    depth: 2,
    content: [
      'Stable expression in HeLa cells and MEFs by retrovirus infection'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'To prepare the retrovirus solution, HEK293T cells were transfected for 4–6 h with the\n                    pMRX-IP-based, pMRX-IB-based, or pMXs-based retroviral plasmid (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c20',
            content: [
              '\n                        Kitamura et al., 2003'
            ]
          },
          ';\n                        ',
          {
            type: 'Cite',
            target: 'c41',
            content: [
              'Saitoh et al., 2003\n                        '
            ]
          }
        ]
      },
      '\n                    ), pCG-gag-pol, and pCG-VSV-G using Lipofectamine 2000 (Thermo Fisher Scientific, 11668019),\n                    following which the medium was replaced with DMEM. After 2–3 days, the retrovirus-containing medium\n                    was harvested, filtered with a 0.45-μm filter unit (Millipore, Ultrafree-MC) and added to HeLa cells\n                    with 8 μg/mL polybrene (Sigma-Aldrich, H9268). After a day, selection was performed with 1–2 μg/mL\n                    puromycin (Sigma-Aldrich, P8833) or 2–3 μg/mL blasticidin (Fujifilm Wako Pure Chemical Corporation,\n                    022-18713).\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's4d',
    depth: 2,
    content: [
      'Antibodies and reagents'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Primary antibodies used in this study are as listed: mouse monoclonal anti-Halo\n                    (Promega, G9211), rabbit polyclonal anti-SNAP-tag (New England BioLabs, P9310S), mouse monoclonal\n                    anti-HSP90 (BD Transduction Laboratories, 610419), anti-β-actin (Sigma-Aldrich, A2228), rabbit\n                    polyclonal anti-LC3 (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c12',
            content: [
              'Kabeya et al., 2000\n                        '
            ]
          }
        ]
      },
      '\n                    ), rabbit polyclonal anti-GFP (Thermo Fisher Scientific, A6455), mouse monoclonal anti-RFP (MBL,\n                    M155-3). Secondary antibodies are HRP-conjugated goat polyclonal anti-rabbit IgG (Jackson\n                    ImmunoResearch Laboratories, 111-035-144), HRP-conjugated goat polyclonal anti-mouse IgG (Jackson\n                    ImmunoResearch Laboratories, 115-035-003). LysoTracker Red DND-99 or Deep Red (Thermo Fisher\n                    Scientific, L7528, L12492) were applied at 75 nM.\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's4e',
    depth: 2,
    content: [
      'Protein extraction'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Cells were incubated in DMEM with 100 nM TMR-conjugated Halo ligand (Promega, G8251)\n                    for 20 min. The cells were then collected for protein extraction or washed twice with\n                    phosphate-buffered saline (PBS) and incubated with amino acid-free and FBS-free DMEM (Wako Pure\n                    Chemical Industries, 048-33575) to induce autophagy by starvation or to DMEM with 1 µM oligomycin\n                    (Merck Millipore, 495455) and 2 µM antimycin (Sigma-Aldrich, A8674) to induce mitophagy. After the\n                    desired incubation time, cells were scraped into ice-cold PBS and centrifuged at 2,000 × ',
      {
        type: 'Emphasis',
        content: [
          'g\n                    '
        ]
      },
      ' for 2 min. The cell pellet was then resuspended in lysis buffer (25 mM HEPES-KOH [pH 7.2],\n                    150 mM NaCl, 2 mM MgSO4, 0.2% ',
      {
        type: 'Emphasis',
        content: [
          'n'
        ]
      },
      '-dodecyl-β-D-maltoside [Nacalai Tesque,\n                    14239-54] with protease inhibitor [Sigma-Aldrich, P8340]). After 20 min of incubation on ice, 1/10\n                    volume of lysis buffer containing benzonase (Merck Millipore, 70664) was added to the cell\n                    suspension to a final 1/200 dilution of benzonase. Protein concentration was determined with\n                    NanoDrop One spectrophotometer (Thermo Fisher Scientific).\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's4f',
    depth: 2,
    content: [
      'In-gel fluorescence imaging and immunoblotting'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'For each sample, 20 µg of protein was separated by SDS-PAGE. For in-gel fluorescence\n                    imaging, the gel was immediately visualized with FUSION SOLO.7S.EDGE (Vilber-Lourmat) after\n                    SDS-PAGE. For immunoblotting, the samples were transferred from the SDS-PAGE gel to Immobilon-P\n                    polyvinylidene difluoride membranes (Millipore, WBKLS0500) with Trans-Blot Turbo Transfer System\n                    (Bio-Rad). After incubation with the relevant antibody, the signals from incubation with SuperSignal\n                    West Pico Chemiluminescent Substrate (Thermo Fisher Scientific, 34579) or Immobilon Western\n                    Chemiluminescent HRP Substrate (Millipore, WBKLS0500) was detected with FUSION SOLO.7S.EDGE\n                    (Vilber-Lourmat). Band intensities were measured with ',
      {
        type: 'Emphasis',
        content: [
          'Gel Analyze'
        ]
      },
      'r in\n                    the open-source image processing software Fiji (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c42',
            content: [
              'Schindelin et al.,\n                            2012\n                        '
            ]
          }
        ]
      },
      '\n                    ).\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's4g',
    depth: 2,
    content: [
      'Fluorescence imaging (live-cell)'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Imaging was conducted with the Olympus SpinSR10 spinning-disk confocal super-resolution\n                    microscope equipped with a Hamamatsu ORCA-Flash 4.0 camera, a UPLAPO OHR 60× (NA 1.50) lens, and the\n                    SORA disk in place. The microscope was operated with the Olympus cellSens Dimension 2.3 software.\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'HeLa cells or MEFs were seeded onto a four-chamber glass-bottom dish (Greiner Bio-One)\n                    at least 48 h before imaging. 20 min before image acquisition, the cells were incubated with 200 nM\n                    SF650-conjugated Halo ligand (GoryoChemical, A308-02) in FluoroBrite DMEM (Thermo Fisher Scientific,\n                    A1896701) supplemented with 10% FBS, 2 mM L-glutamine, and 50 U/ml penicillin and 50 µg/ml\n                    streptomycin (Gibco, 15070-063). After acquiring images of the cells under growing conditions, they\n                    were washed with PBS twice and then incubated in amino acid-free and FBS-free DMEM (Wako Pure\n                    Chemical Industries, 048-33575) with 200 nM SF650-conjugated Halo ligand to induce autophagy by\n                    starvation or in the aforementioned supplemented FluoroBrite DMEM with 200 nM SF650-conjugated Halo\n                    ligand, 1 μM oligomycin, and 2 μM antimycin to induce mitophagy.\n                '
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'Images were processed using the open-source image processing software Fiji (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c42',
            content: [
              'Schindelin et al.,\n                            2012\n                        '
            ]
          }
        ]
      },
      '\n                    ). Cells were processed individually: each cell was first isolated as a single image, which was\n                    later processed. In ',
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig2',
        content: [
          'Figures\n                        2B\n                    '
        ]
      },
      ' and S2A, puncta were identified and counted with ',
      {
        type: 'Emphasis',
        content: [
          'White Top Hat'
        ]
      },
      ' (from\n                    MorphoLibJ (\n                    ',
      {
        type: 'Emphasis',
        content: [
          {
            type: 'Cite',
            target: 'c25',
            content: [
              'Legland et al.,\n                            2016\n                        '
            ]
          }
        ]
      },
      '\n                    )) followed by ',
      {
        type: 'Emphasis',
        content: [
          'Analyze Particles'
        ]
      },
      '. For double-positive puncta (RFP',
      {
        type: 'Superscript',
        content: [
          '\n                        +'
        ]
      },
      'GFP',
      {
        type: 'Superscript',
        content: [
          '+'
        ]
      },
      ' or Halo',
      {
        type: 'Superscript',
        content: [
          '+'
        ]
      },
      'GFP',
      {
        type: 'Superscript',
        content: [
          '+'
        ]
      },
      ') and single-positive (RFP',
      {
        type: 'Superscript',
        content: [
          '+'
        ]
      },
      'GFP',
      {
        type: 'Superscript',
        content: [
          '\n                        −\n                    '
        ]
      },
      ' or Halo',
      {
        type: 'Superscript',
        content: [
          '+'
        ]
      },
      'GFP',
      {
        type: 'Superscript',
        content: [
          '−'
        ]
      },
      ') puncta identification in ',
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig2',
        content: [
          'Figures\n                        2E, 2G'
        ]
      },
      ', ',
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig3',
        content: [
          '3H'
        ]
      },
      ',\n                    and ',
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig3',
        content: [
          '3J'
        ]
      },
      ', the positions\n                    of the puncta were identified with ',
      {
        type: 'Emphasis',
        content: [
          'Find Maxima'
        ]
      },
      ' and marked as points on\n                    a binary image for both fluorescence channels. With the binarized images, double-positive puncta\n                    were identified with the ',
      {
        type: 'Emphasis',
        content: [
          'AND'
        ]
      },
      ' function in ',
      {
        type: 'Emphasis',
        content: [
          'Image\n                        Calculator\n                    '
        ]
      },
      ' (i.e., ‘GFP’ image ',
      {
        type: 'Emphasis',
        content: [
          'AND'
        ]
      },
      ' ‘RFP’ image) while single-positive\n                    puncta were identified with the ',
      {
        type: 'Emphasis',
        content: [
          'Subtract'
        ]
      },
      ' function in ',
      {
        type: 'Emphasis',
        content: [
          'Image Calculator\n                    '
        ]
      },
      ' (i.e., ‘RFP’ image ',
      {
        type: 'Emphasis',
        content: [
          'Subtract'
        ]
      },
      ' ‘GFP’ image). The resulting\n                    puncta after each operation were counted with ',
      {
        type: 'Emphasis',
        content: [
          'Analyze Particles'
        ]
      },
      '.\n                    In ',
      {
        type: 'Link',
        relation: 'fig',
        target: '#fig4',
        content: [
          'Figure 4E'
        ]
      },
      ', a 98',
      {
        type: 'Superscript',
        content: [
          '\n                        th\n                    '
        ]
      },
      ' percentile threshold was set and the area of the signal remaining after thresholding was\n                    measured with ',
      {
        type: 'Emphasis',
        content: [
          'Analyze Particles'
        ]
      },
      '.\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's4h',
    depth: 2,
    content: [
      'Flow cytometry'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'HeLa cells or MEFs were treated with or without 250 nM Torin1 (Tocris Bioscience, 4247)\n                    in DMEM for 24 h. Each sample was detached by trypsinization, added to an equal volume of DMEM to\n                    inactivate trypsin, and centrifuged at 2,000 × ',
      {
        type: 'Emphasis',
        content: [
          'g'
        ]
      },
      ' for 2 min at 4°C. The\n                    cell pellet was then resuspended in ice-cold PBS containing 7-amino-actinomycin D (BD Pharmingen,\n                    559925) diluted 1:100. After 10 min on ice, 5 volumes of ice-cold PBS were added (e.g., 500 μl to\n                    100 μl) and the sample was centrifuged at 2,000 × ',
      {
        type: 'Emphasis',
        content: [
          'g'
        ]
      },
      ' for 2 min at 4°C.\n                    The cell pellet was resuspended in ice-cold PBS and subjected to flow cytometry by a cell analyzer\n                    (Sony, EC800) equipped with 488 nm and 561 nm lasers. All data points were transferred to Kaluza\n                    Analysis 2.1 software (Beckman Coulter) for analysis.\n                '
    ]
  },
  {
    type: 'Heading',
    id: 's5',
    depth: 1,
    content: [
      'Data and material availability'
    ]
  },
  {
    type: 'Paragraph',
    content: [
      'All data generated or analyzed during this study are included in the manuscript and\n                supporting files. Plasmids and plasmid maps for the constructs stated in this manuscript will be\n                available from ',
      {
        type: 'Emphasis',
        content: [
          'Addgene'
        ]
      },
      ' (',
      {
        type: 'Link',
        target: 'https://www.addgene.org/Noboru_Mizushima/',
        content: [
          '\n                    https://www.addgene.org/Noboru_Mizushima/'
        ]
      },
      ').\n            '
    ]
  },
  {
    type: 'Claim',
    content: [
      'This is a claim'
    ]
  },
  {
    type: 'Claim',
    claimType: 'Statement',
    content: [
      'This is a statement claim'
    ]
  }
]
