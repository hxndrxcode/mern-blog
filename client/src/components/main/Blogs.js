import React from "react";

const Page = ({ title }) => (
  <div>
    <h3>Conveying meaning to assistive technologies</h3>
    <p>Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies – such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (e.g. the visible text), or is included through alternative means, such as additional text hidden with the <code>.sr-only</code> class.
      Disable text wrapping</p>
    <p>If you don’t want the button text to wrap, you can add the .text-nowrap class to the button. In Sass, you can set $btn-white-space: nowrap to disable text wrapping for each button.</p>
    <h3>Button tags</h3>
    <p>The <code>.btn</code> classes are designed to be used with the <code>&lt;button&gt;</code> element. However, you can also use these classes on <code>&lt;a&gt;</code> or <code>&lt;input&gt;</code> elements (though some browsers may apply a slightly different rendering).</p>
    <p>When using button classes on <code>&lt;a&gt;</code> elements that are used to trigger in-page functionality (like collapsing content), rather than linking to new pages or sections within the current page, these links should be given a role=&quot;button&quot; to appropriately convey their purpose to assistive technologies such as screen readers.</p>

  </div>
);

export default Page;