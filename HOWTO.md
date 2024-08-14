# The Fu to edit the transition requirements 

HTML elements are displayed or not based on the user selection.

When an option is selected, it updates the URL of the document with a new set of parameters. Those parameters are reflected within the HTML document using the @data attributes.

So far, we have the following data attributes (each matching a URL parameter):

1. data-profile for a |-separated list of profile
2. data-rec for a |-separated list of REC paths
3. data-cr for a |-separated list of CR paths
3. data-informativeOnly for a |-separated list of FPWD and WD paths
4. data-returning for a |-separated list of FPWD and WD paths
5. data-notehistory for a |-separated list of first [working|interest] group note paths
7. data-echidna for automatic publishing

If no data attributes are present, the element will get displayed for all possible states within the scope of the parent element. For example, to display an element for all types of Recommendations, use data-profile="rec" and don't use the data-rec attribute on that element.'

If data attributes are used, one of them must be @data-profile, otherwise the other data attributes will be ignored.

e.g.
```
<div id='d1' data-profile="CR">
  <p id='e1'>This is a new publication.</p>
  <p id='e2' data-profile="CR" data-cr="new|snapshot">It will a snapshot (which might be the first snapshot).</p>
  <p id='e3' data-profile="CR" data-cr="draft">It will be a draft.</p>
  <p id='e4' data-profile="REC">This is bogus.</p>
</div>
```

* d1 and e1 will get displayed if the user selected any of the Candidate Recommendation options (the URL contains the parameter profile=CR ).
* e2 will get displayed only for snapshots, including the first one.
* e3 will get displayed only for CR drafts.
* e4 will never get displayed since the scope of its parent element is CR (and a document can't be a CR and a REC at the same time).

To find the possible values for each data attribute, look at the HTML option and input HTML elements in [the document](https://github.com/w3c/transitions/blob/main/index.html#L269). Or, if you're looking for a particular document transition, use the form to select and see the values of the URL parameters.

# New W3C Process

To add or remove a document status, one must:

1. remove or add the status in the HTML option elements (id="profile")
2. add or remove HTML input elements if applicable
3. Update the data-profile attributes

If HTML input elements were added or removed:
1. update the corresponding data- attributes
1. update the config object near the top of the script
1. update the JS functions onpushstate (URL) and titleMatch (attribute matching)

# New Echidna updates

For echidna updates:
1. Update data-profile on the ul element with id='echidna-selection"
2. Update the data-echidna as needed (you're likely to add data-echidna="false"')
3. Update the JS function hasEchidna()

# History

The transition requirements document is originally based on
 https://services.w3.org/xslt?xmlfile=https://www.w3.org/2005/08/01-transitions2017.html&xslfile=https://www.w3.org/2005/08/transitions2017.xsl
