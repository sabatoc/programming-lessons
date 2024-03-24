using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
   public float moveSpeed = 5f;
   private Animator animator;
   private Rigidbody rb;
   [SerializeField] float jumpForce = 50f;
   private bool isGrounded = true;

   private void Start()
   {
       rb = GetComponent<Rigidbody>();
       animator = GetComponent<Animator>();
   }

   // Update is called once per frame
   private void Update()
   {
       HandleMovement();
       HandleAttack();
       HandleJump();
   }

   private void HandleMovement()
   {
       float horizontalInput = Input.GetAxis("Horizontal");
       float verticalInput = Input.GetAxis("Vertical");

       float moveAmount = Mathf.Clamp01(Mathf.Abs(horizontalInput) + Mathf.Abs(verticalInput));

       var moveInput = new Vector3(horizontalInput, 0, verticalInput);

       // Move the character based on the moveInput vector
       transform.position += moveInput * moveSpeed * Time.deltaTime;

       // Only rotate the character if there is movement input
       if (moveInput != Vector3.zero)
       {
           transform.rotation = Quaternion.LookRotation(moveInput);
       }

       animator.SetFloat("moveAmount", moveAmount);
   }

   private void HandleAttack()
   {
        if (Input.GetKeyDown(KeyCode.V))
        {
            // Activate the attack animation
            animator.SetTrigger("AttackTrigger");
        }
   }

   private void HandleJump()
   {
       // Check for jump input (default is space key in Unity)
       if (Input.GetButtonDown("Jump") && isGrounded == true)
       {
           isGrounded = false; // Prevent multiple jumps while in the air
           rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
       }
   }

   // Detect collision with the ground
   private void OnCollisionEnter(Collision collision)
   {
       // Assuming your ground has a tag named "Ground"
       if (collision.gameObject.CompareTag("Ground"))
       {
           isGrounded = true;
       }
   }


}
