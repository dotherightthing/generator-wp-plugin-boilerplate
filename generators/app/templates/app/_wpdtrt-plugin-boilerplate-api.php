<?php
/**
 * API requests
 *
 * This file contains PHP.
 *
 * @link        <%= pluginUrl %>
 * @since       0.1.0
 *
 * @package     <%= nameFriendlySafe %>
 * @subpackage  <%= nameFriendlySafe %>/app
 */

if ( !function_exists( '<%= nameSafe %>_get_data' ) ) {

  /**
   * Request the data from the API
   *
   * @param       string $<%= nameSafe %>_datatype
   *    The type of data to return.
   * @return      object $<%= nameSafe %>_data
   *    The body of the JSON response
   *
   * @since       0.1.0
   * @uses        ../../../../wp-includes/http.php
   * @see         https://developer.wordpress.org/reference/functions/wp_remote_get/
   */
  function <%= nameSafe %>_get_data( $<%= nameSafe %>_datatype ) {

    $endpoint = 'http://jsonplaceholder.typicode.com/' . $<%= nameSafe %>_datatype;

    $args = array(
      'timeout' => 30 // seconds to wait for the request to complete
    );

    $response = wp_remote_get(
      $endpoint,
      $args
    );

    /**
     * Return the body, not the header
     * Note: There is an optional boolean argument, which returns an associative array if TRUE
     */
    $<%= nameSafe %>_data = json_decode( $response['body'] );

    return $<%= nameSafe %>_data;
  }

}

if ( !function_exists( '<%= nameSafe %>_data_refresh' ) ) {

  /**
   * Refresh the data from the API
   *    The 'action' key's value, '<%= nameSafe %>_data_refresh',
   *    matches the latter half of the action 'wp_ajax_<%= nameSafe %>_data_refresh' in our AJAX handler.
   *    This is because it is used to call the server side PHP function through admin-ajax.php.
   *    If an action is not specified, admin-ajax.php will exit, and return 0 in the process.
   *
   * @since       0.1.0
   * @see         https://codex.wordpress.org/AJAX_in_Plugins
   */
  function <%= nameSafe %>_data_refresh() {

    $<%= nameSafe %>_options = get_option('<%= nameSafe %>');
    $last_updated = $<%= nameSafe %>_options['last_updated'];

    $current_time = time();
    $update_difference = $current_time - $last_updated;
    $one_hour = (1 * 60 * 60);

    if ( $update_difference > $one_hour ) {

      $<%= nameSafe %>_datatype = $<%= nameSafe %>_options['<%= nameSafe %>_datatype'];

      $<%= nameSafe %>_options['<%= nameSafe %>_data'] = <%= nameSafe %>_get_data( $<%= nameSafe %>_datatype );

      // inspecting the database will allow us to check
      // whether the profile is being updated
      $<%= nameSafe %>_options['last_updated'] = time();

      update_option('<%= nameSafe %>', $<%= nameSafe %>_options);
    }

    /**
     * Let the Ajax know when the entire function has completed
     *
     * wp_die() vs die() vs exit()
     * Most of the time you should be using wp_die() in your Ajax callback function.
     * This provides better integration with WordPress and makes it easier to test your code.
     */
    wp_die();

  }

  add_action('wp_ajax_<%= nameSafe %>_data_refresh', '<%= nameSafe %>_data_refresh');

}

?>